import * as React from 'react';
import { Ingredient } from 'generated/schema';
import { cold } from 'react-hot-loader';
import Downshift from 'downshift';
import { Input, Popup } from 'components/generic';
import PickerCreateIngredientMutation from './PickerCreateIngredientMutation';
import Suggestions from './Suggestions';
import { H3 } from 'components/typeset';

const ingredientToString = ingredient => {
  if (!ingredient) {
    return '';
  }

  if (ingredient.id) {
    return ingredient.name;
  }

  return ingredient.name + ' (create)';
};

interface IngredientPickerPopupProps {
  onCancel(): void;
  onChange(ingredient: { id: string; name: string }): void;
  value: Ingredient;
  canCreate?: boolean;
}

const IngredientPickerPopup: React.SFC<IngredientPickerPopupProps> = ({
  onChange,
  onCancel,
  canCreate,
  value,
}) => {
  return (
    <Popup onClose={onCancel}>
      <PickerCreateIngredientMutation>
        {mutate => {
          const handleChange = async (newValue: Ingredient) => {
            if (!newValue.id) {
              const result = await mutate({
                variables: { name: newValue.name },
              });
              if (result) {
                onChange(result.data.createIngredient);
              }
            } else {
              onChange(newValue);
            }
          };

          return (
            <Downshift
              onChange={handleChange}
              itemToString={ingredientToString}
            >
              {({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                selectedItem,
                highlightedIndex,
              }) => {
                return (
                  <div>
                    <Input {...getInputProps()} />
                    {isOpen && (
                      <Suggestions
                        term={inputValue}
                        getItemProps={getItemProps}
                        selectedItem={selectedItem}
                        highlightedIndex={highlightedIndex}
                        canCreate={canCreate}
                      />
                    )}
                  </div>
                );
              }}
            </Downshift>
          );
        }}
      </PickerCreateIngredientMutation>
    </Popup>
  );
};

export default cold(IngredientPickerPopup);
