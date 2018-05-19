// @flow

import React from 'react';
import { type RecipeIngredient } from 'types';
import IngredientField from './IngredientField';
import AddIngredient from './AddIngredient';
import { H2 } from 'components/generic';
import SideControls from '../common/SideControls';

type Props = {
  ingredients: Array<RecipeIngredient>,
  onSetIngredient({
    ingredientId: string,
    unit: string,
    unitValue: number,
  }): mixed,
  onMoveIngredient({ fromIndex: number, toIndex: number }): mixed,
};

export default ({
  ingredients,
  onSetIngredient,
  onPushIngredient,
  onMoveIngredient,
}: Props) => (
  <React.Fragment>
    <H2>Ingredients</H2>
    <SideControls />
    {ingredients.map(recipeIngredient => (
      <IngredientField
        ingredient={recipeIngredient}
        key={recipeIngredient.id}
        onChange={onSetIngredient}
      />
    ))}
    <AddIngredient onAdd={onPushIngredient} />
  </React.Fragment>
);
