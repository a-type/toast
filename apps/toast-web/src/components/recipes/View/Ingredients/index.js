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
      {ingredients.map(({ unit, unitValue, note, ingredient: { name } }) => (
        <Item
          unit={unit}
          unitValue={unitValue}
          note={note}
          name={name}
          key={name}
        />
      ))}
    </List>
  </div>
);
