// @flow
import React from 'react';
import List from './List';
import Item from './Item';
import { H2 } from 'components/typeset';
import { type RecipeIngredient } from 'types';

export default ({ ingredients }: { ingredients: Array<RecipeIngredient> }) => (
  <div>
    <H2>Ingredients</H2>
    <List>
      {ingredients.map(ingredient => (
        <Item {...ingredient} key={ingredient.id} />
      ))}
    </List>
  </div>
);
