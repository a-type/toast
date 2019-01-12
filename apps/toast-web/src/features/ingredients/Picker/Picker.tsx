import React from 'react';
import Downshift from 'downshift';
import { Input, Docked } from 'components/generic';
import Suggestions from './Suggestions';
import Border from './Border';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Ingredient, PickerCreateIngredient } from 'generated/schema';

const CreateIngredient = gql`
  mutation PickerCreateIngredient($name: String!) {
    createIngredient(input: { name: $name }) {
      id
      name
    }
  }
`;

const ingredientToString = ingredient => {
  if (!ingredient) {
    return '';
  }

  if (ingredient.id) {
    return ingredient.name;
  }

  return ingredient.name + ' (create)';
};

export interface IngredientPickerProps {
  onChange(ingredient: Ingredient): void;
  create?(name: string): Promise<Ingredient>;
  canCreate?: boolean;
  value: Ingredient;
  disabled?: boolean;
}

class IngredientPicker extends React.Component<IngredientPickerProps> {
  handleChange = async (newValue: Ingredient) => {
    const { onChange, create } = this.props;

    if (!newValue.id) {
      const result = await create(newValue.name);
      if (result) {
        onChange(result);
      }
    } else {
      onChange(newValue);
    }
  };

  renderSearchControls = ({
    getRootProps,
    getInputProps,
    getItemProps,
    isOpen,
    inputValue,
    selectedItem,
    highlightedIndex,
  }) => {
    return (
      <div style={{ width: '100%' }}>
        <Docked
          dockedContent={
            isOpen && (
              <Suggestions
                term={inputValue}
                getItemProps={getItemProps}
                selectedItem={selectedItem}
                highlightedIndex={highlightedIndex}
                onCreate={this.handleChange}
                canCreate={this.props.canCreate}
              />
            )
          }
        >
          {({ ref }) => (
            <Input
              {...getInputProps({
                ref,
                style: { width: '100%' },
              })}
            />
          )}
        </Docked>
      </div>
    );
  };

  render() {
    const { value, disabled } = this.props;

    if (disabled) {
      return <Input disabled value={ingredientToString(value)} />;
    }

    return (
      <Downshift
        onChange={this.handleChange}
        itemToString={ingredientToString}
        selectedItem={value}
      >
        {this.renderSearchControls}
      </Downshift>
    );
  }
}

export default graphql<
  any,
  PickerCreateIngredient.CreateIngredient,
  PickerCreateIngredient.Variables,
  Partial<IngredientPickerProps>
>(CreateIngredient, {
  props: ({ mutate }) => ({
    create: name =>
      mutate({
        variables: { name: name.toLowerCase() },
      }).then(({ data }: any) => {
        return data.createIngredient;
      }),
  }),
})(IngredientPicker);
