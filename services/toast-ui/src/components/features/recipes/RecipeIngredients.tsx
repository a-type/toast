import React, { FC, useState } from 'react';
import { List, ListItem, makeStyles, Theme, Checkbox } from '@material-ui/core';
import { IngredientDisplay } from 'components/features/IngredientDisplay';
import { FullRecipe, FullRecipeIngredient } from 'hooks/features/fragments';

export interface RecipeIngredientsProps {
  recipe: FullRecipe;
  servingsOverride?: number;
}

const useStyles = makeStyles<Theme, RecipeIngredientsProps>(theme => ({
  list: {},
  listItem: {
    padding: 0,
  },
}));

export const RecipeIngredients: FC<RecipeIngredientsProps> = ({
  recipe,
  servingsOverride,
}) => {
  const classes = useStyles({ recipe, servingsOverride });
  const ingredients = recipe.ingredientsConnection.edges.map(
    ({ node }) => node,
  );

  return (
    <List className={classes.list}>
      {ingredients.map((ingredient, index) => (
        <RecipeIngredientItem
          ingredient={ingredient}
          key={ingredient.id + index}
          multiplier={servingsOverride && servingsOverride / recipe.servings}
          className={classes.listItem}
        />
      ))}
    </List>
  );
};

const RecipeIngredientItem: FC<{
  ingredient: FullRecipeIngredient;
  multiplier: number;
  className: string;
}> = ({ ingredient, multiplier, className }) => {
  const [checked, setChecked] = useState(false);

  return (
    <ListItem className={className}>
      <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
      <IngredientDisplay ingredient={ingredient} multiplier={multiplier} />
    </ListItem>
  );
};
