import * as React from 'react';
import { cold } from 'react-hot-loader';
import { Icon } from 'components/generic';
import Popup from './Popup';
import { sentence } from 'change-case';
import { Button } from 'grommet';
import { pathOr } from 'ramda';

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
}

const IngredientPicker: React.SFC<IngredientPickerProps> = ({
  value,
  canCreate,
  onChange,
  disabled,
}) => {
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const handleChange = (ing: IngredientPickerIngredient) => {
    setPopupOpen(false);
    onChange(ing);
  };

  return (
    <React.Fragment>
      <Button
        onClick={() => setPopupOpen(!isPopupOpen)}
        disabled={disabled}
        icon={<Icon name="edit" />}
        label={sentence(pathOr('Unknown Ingredient', ['name'], value))}
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
