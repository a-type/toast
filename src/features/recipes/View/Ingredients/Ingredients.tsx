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
    {ingredients.map((ingredient: RecipeIngredient) => (
      <Item {...ingredient} key={ingredient.id} servings={servings} />
    ))}
  </List>
);
