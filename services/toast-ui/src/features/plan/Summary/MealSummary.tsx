import React, { FC } from 'react';
import { PlanCookingEdge } from '../types';
import { Spotlight } from 'features/recipes/components/Spotlight';
import { Typography } from '@material-ui/core';

interface PlanMealSummaryProps {
  meal: PlanCookingEdge | null;
}

export const PlanMealSummary: FC<PlanMealSummaryProps> = ({ meal }) => {
  if (!meal) {
    const fakeRecipe = {
      title: 'Nothing planned',
      description: "You didn't make any plans for your next meal.",
    };

    return (
      <>
        <Spotlight recipe={fakeRecipe} />
      </>
    );
  }

  const firstRecipe = meal.node;

  return (
    <>
      <Typography>Cooking</Typography>
      <Spotlight recipe={firstRecipe} />
    </>
  );
};

export default PlanMealSummary;
