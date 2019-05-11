import React from 'react';
import List from './List';
import Item from './Item';
import { RecipeIngredient } from 'generated/schema';

export default ({
  ingredients,
  servings,
}: {
  ingredients: RecipeIngredient[];
  servings: number;
}) => (
  <List>
    {ingredients.map((ingredient: RecipeIngredient, index) => (
      <Item {...ingredient} key={ingredient.id + index} servings={servings} />
    ))}
  </List>
);
