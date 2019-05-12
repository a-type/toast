import React from 'react';
import List from './List';
import Item from './Item';

export default ({
  ingredients,
  servings,
}: {
  ingredients: any[]; // FIXME
  servings: number;
}) => (
  <List>
    {ingredients.map((ingredient: any, index) => (
      <Item {...ingredient} key={ingredient.id + index} servings={servings} />
    ))}
  </List>
);
