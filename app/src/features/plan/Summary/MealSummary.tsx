import React, { FC } from 'react';
import { PlanMealData } from '../types';
import { Text } from 'grommet';
import { Spotlight } from 'features/recipes/components/Spotlight';

interface PlanMealSummaryProps {
  meal: PlanMealData | null;
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
      <Text color="accent-1">Cooking</Text>
      <Spotlight recipe={firstRecipe} />
    </>
  );
};

export default PlanMealSummary;
