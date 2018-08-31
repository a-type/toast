// @flow

import React from 'react';
import { type RecipeIngredient } from 'types';
import Parser, { ParseIngredientFragment } from './Parser';
import Fixer, { FixIngredientFragment } from './Fixer';

export type Props = {
  recipeIngredient: RecipeIngredient,
  recipeId: string,
};

export type State = {
  mode: 'fix' | 'parse',
};

export const fragments = {
  ParseIngredient: ParseIngredientFragment,
  FixIngredient: FixIngredientFragment,
};

export default class IngredientEditor extends React.Component<Props, State> {
  state = {
    mode: this.props.recipeIngredient ? 'fix' : 'parse',
  };

  render() {
    const { mode } = this.state;
    const { recipeIngredient, recipeId } = this.props;

    if (mode === 'parse') {
      return <Parser recipeIngredient={recipeIngredient} recipeId={recipeId} />;
    }

    return <Fixer recipeIngredient={recipeIngredient} />;
  }
}
