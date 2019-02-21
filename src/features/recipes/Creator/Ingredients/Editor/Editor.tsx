import React from 'react';
import Parser, { ParseIngredientFragment } from './Parser';
import Fixer from './Fixer';
import { RecipeIngredient } from 'generated/schema';
import { recipeIngredient as fixerFragment } from './Fixer/fragments';

export const fragments = {
  ParseIngredient: ParseIngredientFragment,
  FixIngredient: fixerFragment,
};

export interface IngredientEditorProps {
  recipeIngredient?: RecipeIngredient;
  recipeId: string;
}

export default class IngredientEditor extends React.Component<
  IngredientEditorProps
> {
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
