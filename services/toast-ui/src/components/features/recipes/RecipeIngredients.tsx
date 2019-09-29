import React, { FC } from 'react';
import { List, ListItem } from '@material-ui/core';
import { IngredientDisplay } from 'components/features/IngredientDisplay';
import { FullRecipe } from 'hooks/features/fragments';

export interface RecipeIngredientsProps {
  recipe: FullRecipe;
  servingsOverride?: number;
}

export const RecipeIngredients: FC<RecipeIngredientsProps> = ({
  recipe,
  servingsOverride,
}) => {
  const ingredients = recipe.ingredientsConnection.edges.map(
    ({ node }) => node,
  );

  return (
    <List>
      {ingredients.map((ingredient: any, index) => (
        <ListItem key={ingredient.id + index}>
          <IngredientDisplay
            ingredient={ingredient}
            key={ingredient.id + index}
            multiplier={servingsOverride && servingsOverride / recipe.servings}
          />
        </ListItem>
      ))}
    </List>
  );
};
