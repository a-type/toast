import * as React from 'react';
import { Ingredient } from 'generated/schema';
import { cold } from 'react-hot-loader';
import { Icon } from 'components/generic';
import Popup from './Popup';
import { sentence } from 'change-case';
import { Button } from 'grommet';

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
      <Button
        onClick={() => setPopupOpen(!isPopupOpen)}
        disabled={disabled}
        icon={<Icon name="edit" />}
        label={sentence(value.name)}
      />
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
