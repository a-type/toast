import React, { FC } from 'react';
import { PlanMealData } from '../types';
import { Text } from 'grommet';
import { Spotlight } from 'features/recipes/components';
import { pathOr } from 'ramda';

interface PlanMealSummaryProps {
  meal: PlanMealData;
}

export const PlanMealSummary: FC<PlanMealSummaryProps> = ({ meal }) => {
  if (meal.cooking.length) {
    const firstRecipe = meal.cooking[0];

    return (
      <>
        <Text color="accent-1">Cooking</Text>
        <Spotlight recipe={firstRecipe} />
      </>
    );
  }

  const firstRecipe = pathOr(null, ['eating', 0, 'cooking', 0], meal);

  if (!firstRecipe) {
    return <Text>Nothing planned</Text>;
  }

  return (
    <>
      <Text>Leftovers</Text>
      <Spotlight recipe={firstRecipe} />
    </>
  );
};

export default PlanMealSummary;
