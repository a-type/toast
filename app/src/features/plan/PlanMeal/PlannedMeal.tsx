import React, { SFC } from 'react';
import { PlanMealData, PlanMealRecipeData } from '../types';
import { Card, Icon } from 'components/generic';
import RecipeCard from 'features/recipes/RecipeCards/RecipeCard';
import { Box } from 'grommet';
import { path } from 'ramda';

interface MealProps {
  meal: PlanMealData;
}

const PlannedMeal: SFC<MealProps> = ({ meal }) => {
  if (!!meal) {
    const servings = path(['servings'], meal);
    return (
      <RecipeCard
        recipe={path(['node'], meal)}
        renderBadge={() => `${servings} serving${servings !== 1 ? 's' : ''}`}
      />
    );
  }

  return <Card />;
};

export default PlannedMeal;
