// @flow
import React from 'react';
import List from './List';
import Item from './Item';
import { type RecipeIngredient } from 'types';

export default ({ ingredients }: { ingredients: Array<RecipeIngredient> }) => (
  <List>
    {ingredients.map(ingredient => (
      <Item {...ingredient} key={ingredient.id} />
    ))}
  </List>
);
