import React from 'react';
import Item from './Item';
import { List, ListItem } from '@material-ui/core';

export default ({
  ingredients,
  servings,
}: {
  ingredients: any[]; // FIXME
  servings: number;
}) => (
  <List>
    {ingredients.map((ingredient: any, index) => (
      <ListItem key={ingredient.id + index}>
        <Item {...ingredient} key={ingredient.id + index} servings={servings} />
      </ListItem>
    ))}
  </List>
);
