import React, { SFC } from 'react';
import { PlanMealData } from '../types';
import { Card, Icon } from 'components/generic';
import RecipeCard from 'features/recipes/RecipeCards/RecipeCard';
import { Box } from 'grommet';

interface MealProps {
  meal: PlanMealData;
}

const PlannedMeal: SFC<MealProps> = ({ meal }) => {
  if (meal.cooking.length) {
    return <RecipeCard recipe={meal.cooking[0]} />;
  } else if (meal.eating.length) {
    return (
      <RecipeCard
        recipe={meal.eating[0].cooking[0]}
        renderBadge={() => (
          <Box align="center" justify="center" direction="row">
            <Icon name="microwave" size="1.5em" />
            <span>&nbsp;&nbsp;Leftovers</span>
          </Box>
        )}
      />
    );
  }

  return <Card />;
};

export default PlannedMeal;
