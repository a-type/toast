import React, { SFC } from 'react';
import { PlanMealData } from '../types';
import { Card } from 'components/generic';
import RecipeCard from 'features/recipes/RecipeCards/RecipeCard';

interface MealProps {
  meal: PlanMealData;
}

const PlannedMeal: SFC<MealProps> = ({ meal }) => {
  if (meal.cooking.length) {
    return <RecipeCard recipe={meal.cooking[0]} />;
  }

  return <Card />;
};

export default PlannedMeal;
