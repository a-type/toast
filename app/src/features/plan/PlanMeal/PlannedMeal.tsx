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
  if (meal.cooking.length) {
    const servings = path(['cooking', 0, 'servings'], meal);
    return (
      <RecipeCard
        recipe={path(['cooking', 0, 'recipe'], meal)}
        renderBadge={() => `${servings} serving${servings !== 1 ? 's' : ''}`}
      />
    );
  } else if (meal.eating.length) {
    const recipe = path(
      ['eating', 0, 'cooking', 0, 'recipe'],
      meal,
    ) as PlanMealRecipeData;
    return (
      <RecipeCard
        recipe={recipe}
        renderBadge={() => (
          <Box align="center" justify="center" direction="row">
            <Icon name="autorenew" size="1.5em" />
            <span>&nbsp;&nbsp;Leftovers</span>
          </Box>
        )}
      />
    );
  }

  return <Card />;
};

export default PlannedMeal;
