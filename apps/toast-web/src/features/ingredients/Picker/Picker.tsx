import * as React from 'react';
import { Ingredient } from 'generated/schema';
import { cold } from 'react-hot-loader';
import { Button, Icon } from 'components/generic';
import { Span } from 'components/typeset';
import Popup from './Popup';
import { sentence } from 'change-case';

export interface IngredientPickerProps {
  onChange(ingredient: Ingredient): void;
  create?(name: string): Promise<Ingredient>;
  canCreate?: boolean;
  value: Ingredient;
  disabled?: boolean;
}

const IngredientPicker: React.SFC<IngredientPickerProps> = ({
  value,
  canCreate,
  onChange,
  disabled,
}) => {
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const handleChange = (ing: Ingredient) => {
    setPopupOpen(false);
    onChange(ing);
  };

  return (
    <React.Fragment>
      <Button.Ghost
        onClick={() => setPopupOpen(!isPopupOpen)}
        disabled={disabled}
      >
        <Span>{sentence(value.name)}</Span>
        &nbsp;
        <Icon name="edit" />
      </Button.Ghost>
      {isPopupOpen && (
        <Popup
          value={value}
          canCreate={canCreate}
          onChange={handleChange}
          onCancel={() => setPopupOpen(false)}
        />
      )}
    </React.Fragment>
  );
};

export default cold(IngredientPicker);
