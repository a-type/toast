import React, { FC } from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import RecipeCard from './RecipeCard';

export type PlanMealProps = {
  meal: PlanMealPlanMeal;
};

export type PlanMealPlanMeal = {
  id: string;
  date: string;
  mealName: string;
  note: string | null;
  cooking: PlanMealRecipe | null;
};

export type PlanMealRecipe = {
  id: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  attribution: string | null;
};

export const PlanMeal: FC<PlanMealProps> = ({ meal }) => (
  <Box>
    <Box display="flex" flexDirection="row">
      <Typography variant="h5">{meal.mealName}</Typography>
    </Box>
    {meal.note && <PlanMealNote>{meal.note}</PlanMealNote>}
    {meal.cooking && <RecipeCard hideSave recipe={meal.cooking} />}
  </Box>
);

const useNoteStyles = makeStyles(theme => ({
  box: {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}));

const PlanMealNote: FC = ({ children }) => {
  const classes = useNoteStyles({ children });

  return <Box className={classes.box}>{children}</Box>;
};
