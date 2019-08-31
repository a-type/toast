import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { IngredientDisplay } from 'components/features/IngredientDisplay';

export default ({
  recipeId,
  ingredients,
  servingsOverride,
  naturalServings,
}: {
  recipeId: string;
  ingredients: any[]; // FIXME
  servingsOverride?: number;
  naturalServings: number;
}) => (
  <List>
    {ingredients.map((ingredient: any, index) => (
      <ListItem key={ingredient.id + index}>
        <IngredientDisplay
          ingredient={ingredient}
          recipeId={recipeId}
          key={ingredient.id + index}
          multiplier={servingsOverride && servingsOverride / naturalServings}
        />
      </ListItem>
    ))}
  </List>
);
