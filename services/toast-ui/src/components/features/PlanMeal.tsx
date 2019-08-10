import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';
import { FormattedDate } from 'components/generic/FormattedDate';
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
    <Typography>
      <FormattedDate date={meal.date} />
    </Typography>
    {meal.note && <Typography>{meal.note}</Typography>}
    {meal.cooking && <RecipeCard recipe={meal.cooking} />}
  </Box>
);
