import * as React from 'react';
import { cold } from 'react-hot-loader';
import Downshift from 'downshift';
import { Popup } from 'components/generic';
import PickerCreateIngredientMutation from './PickerCreateIngredientMutation';
import Suggestions from './Suggestions';
import { Heading, TextInput } from 'grommet';

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
  value: { id: string; name: string };
  canCreate?: boolean;
  initialSearchText?: string;
}

const IngredientPickerPopup: React.SFC<IngredientPickerPopupProps> = ({
  onChange,
  onCancel,
  canCreate,
  value,
  initialSearchText,
}) => {
  return (
    <Popup onClose={onCancel}>
      <PickerCreateIngredientMutation>
        {mutate => {
          const handleChange = async (newValue: {
            id: string;
            name: string;
          }) => {
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
              defaultInputValue={initialSearchText}
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
                    <Heading level="3">Search ingredients</Heading>
                    <TextInput
                      {...getInputProps({ style: { width: '100%' } })}
                    />
                    <Suggestions
                      term={inputValue}
                      getItemProps={getItemProps}
                      selectedItem={selectedItem}
                      highlightedIndex={highlightedIndex}
                      canCreate={canCreate}
                    />
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
