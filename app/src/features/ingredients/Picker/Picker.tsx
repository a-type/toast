import * as React from 'react';
import { Icon } from 'components/generic/Icon';
import Popup from './Popup';
import { sentence } from 'change-case';
import { pathOr } from 'ramda';
import { Button } from '@material-ui/core';

export interface IngredientPickerIngredient {
  id: string;
  name: string;
}

export interface IngredientPickerProps {
  onChange(ingredient: IngredientPickerIngredient): void;
  create?(name: string): Promise<IngredientPickerIngredient>;
  canCreate?: boolean;
  value: IngredientPickerIngredient;
  disabled?: boolean;
  initialSearchText?: string;
}

const IngredientPicker: React.SFC<IngredientPickerProps> = ({
  value,
  canCreate,
  onChange,
  disabled,
  initialSearchText,
}) => {
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const handleChange = (ing: IngredientPickerIngredient) => {
    setPopupOpen(false);
    onChange(ing);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setPopupOpen(!isPopupOpen)} disabled={disabled}>
        <Icon name="create" />
        {sentence(pathOr('Unknown Ingredient', ['name'], value))}
      </Button>
      {isPopupOpen && (
        <Popup
          value={value}
          initialSearchText={initialSearchText}
          canCreate={canCreate}
          onChange={handleChange}
          onCancel={() => setPopupOpen(false)}
        />
      )}
    </React.Fragment>
  );
};

export default IngredientPicker;
