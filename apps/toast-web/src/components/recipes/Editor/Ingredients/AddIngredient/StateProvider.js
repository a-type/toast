// @flow

import React, { type Node } from 'react';
import {
  type RecipeIngredient,
  type RecipeIngredientParams,
  type Ingredient,
} from 'types';
import { graphql } from 'react-apollo';
import { Create } from 'mutations/RecipeIngredients';

type Props = {
  create(params: RecipeIngredientParams): Promise<RecipeIngredient>,
  children(state: IngredientFieldState): Node,
  onSubmitComplete(): void,
};
type State = {
  ingredient: ?Ingredient,
  unit: string,
  unitValue: number,
  index: number,
};

export type IngredientFieldState = State & {
  onFieldChange(fieldName: string, value: any): void,
  onFieldBlur(fieldName: string): void,
  onSubmit(): void,
};

class AddIngredientStateProvider extends React.PureComponent<Props, State> {
  state = {
    ingredient: null,
    unit: '',
    unitValue: 1,
    index: 0,
  };

  save = async () => {
    const { create, onSubmitComplete } = this.props;
    const { ingredient, unit, unitValue } = this.state;

    if (!ingredient || !unit || !unitValue) {
      return;
    }

    try {
      await create({
        ingredientId: ingredient.id,
        unit,
        unitValue,
      });
      onSubmitComplete();
      this.setState({
        ingredient: null,
        unit: '',
        unitValue: 1,
        index: 0,
      });
    } catch (err) {
      console.error(err);
    }
  };
  handleFieldChange = (fieldName: string, value: any) => {
    this.setState({ [fieldName]: value });
  };
  handleFieldBlur = () => {};
  handleSubmit = () => {
    this.save();
  };

  render() {
    const { ingredient, unit, unitValue, index } = this.state;

    const params = {
      ingredient,
      unit,
      unitValue,
      index,
      onFieldChange: this.handleFieldChange,
      onFieldBlur: this.handleFieldBlur,
      onSubmit: this.handleSubmit,
    };

    return this.props.children(params);
  }
}

export default graphql(Create, {
  props: ({ ownProps, mutate }) => ({
    create: (params: RecipeIngredientParams) =>
      mutate({
        variables: { ...params, recipeId: ownProps.recipeId },
      }),
  }),
})(AddIngredientStateProvider);
