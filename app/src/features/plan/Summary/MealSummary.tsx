import React, { FC } from 'react';
import { PlanMealData } from '../types';
import { Text } from 'grommet';
import { Spotlight } from 'features/recipes/components/Spotlight';
import { pathOr } from 'ramda';

interface PlanMealSummaryProps {
  meal: PlanMealData | null;
}

export const PlanMealSummary: FC<PlanMealSummaryProps> = ({ meal }) => {
  if (!meal || !meal.cooking.length || !meal.eating.length) {
    const fakeRecipe = {
      title: 'Nothing planned',
      description: "You didn't make any plans for your next meal.",
    };

    return (
      <>
        <Spotlight recipe={fakeRecipe} />
      </>
    );
  } else if (meal.cooking.length) {
    const firstRecipe = meal.cooking[0].recipe;

    return (
      <>
        <Text color="accent-1">Cooking</Text>
        <Spotlight recipe={firstRecipe} />
      </>
    );
  } else if (meal.eating.length) {
    const firstRecipe = pathOr(
      null,
      ['eating', 0, 'cooking', 0, 'recipe'],
      meal,
    );

    return (
      <>
        <Text>Leftovers</Text>
        <Spotlight recipe={firstRecipe} />
      </>
    );
  }

  return null;
};

export default PlanMealSummary;
