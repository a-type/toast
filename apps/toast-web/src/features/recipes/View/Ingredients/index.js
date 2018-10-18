import React from 'react';
import List from './List';
import Item from './Item';

export default ({ ingredients, servings }) => (
  <List>
    {ingredients.map(ingredient => (
      <Item {...ingredient} key={ingredient.id} servings={servings} />
    ))}
  </List>
);
