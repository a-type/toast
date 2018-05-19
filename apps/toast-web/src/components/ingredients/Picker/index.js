// @flow

import React from 'react';
import Downshift, { type ControllerStateAndHelpers } from 'downshift';
import { Input, Docked } from 'components/generic';
import Suggestions from './Suggestions';
import Border from './Border';
import { type Ingredient, type SearchPayload } from 'types';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const CreateIngredient = gql`
  mutation CreateIngredient($name: String!) {
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

type Props = {
  value: ?Ingredient,
  onChange(value: Ingredient): any,
  canCreate?: boolean,
  create(name: String): Promise<any>,
  disabled: boolean,
};

class IngredientPicker extends React.Component<Props, *> {
  handleChange = async newValue => {
    const { onChange, create } = this.props;
    console.log(newValue);

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
  }: ControllerStateAndHelpers) => {
    return (
      <div>
        <Docked isDockedVisible={isOpen}>
          {({ anchorRef, renderDocked }) => (
            <React.Fragment>
              <Input
                {...getInputProps({
                  placeholder: 'Ingredient name...',
                  innerRef: anchorRef,
                })}
              />
              {isOpen &&
                renderDocked(
                  <Suggestions
                    term={inputValue}
                    getItemProps={getItemProps}
                    selectedItem={selectedItem}
                    highlightedIndex={highlightedIndex}
                    onCreate={this.props.onChange}
                    canCreate={this.props.canCreate}
                  />,
                )}
            </React.Fragment>
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

export default graphql(CreateIngredient, {
  props: ({ mutate }) => ({
    create: name =>
      mutate({
        variables: { name: name.toLowerCase() },
      }).then(({ data }) => {
        return data.createIngredient;
      }),
  }),
})(IngredientPicker);
