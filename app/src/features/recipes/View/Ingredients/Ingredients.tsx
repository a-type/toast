import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { IngredientDisplay } from 'features/ingredients/IngredientDisplay';

export default ({
  recipeId,
  ingredients,
  servings,
}: {
  recipeId: string;
  ingredients: any[]; // FIXME
  servings: number;
}) => (
  <List>
    {ingredients.map((ingredient: any, index) => (
      <ListItem key={ingredient.id + index}>
        <IngredientDisplay
          ingredient={ingredient}
          recipeId={recipeId}
          key={ingredient.id + index}
        />
      </ListItem>
    ))}
  </List>
);
