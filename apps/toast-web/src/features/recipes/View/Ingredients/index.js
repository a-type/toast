// @flow
import React from 'react';
import List from './List';
import Item from './Item';
import { type RecipeIngredient } from 'types';

type Props = {
  ingredients: RecipeIngredient[],
  servings: number,
};

export default ({ ingredients, servings }: Props) => (
  <List>
    {ingredients.map(ingredient => (
      <Item {...ingredient} key={ingredient.id} servings={servings} />
    ))}
  </List>
);
