import React, { SFC } from 'react';
import { PlanCookingEdge } from '../types';
import RecipeCard from 'features/recipes/RecipeCards/RecipeCard';
import { path } from 'ramda';
import { makeStyles } from '@material-ui/core';

interface MealProps {
  meal: PlanCookingEdge;
  variant?: 'full' | 'compact';
}

const useStyles = makeStyles({
  card: {
    flexGrow: 1,
  },
});

const PlannedMeal: SFC<MealProps> = ({ meal, variant = 'full' }) => {
  const classes = useStyles({});

  if (!!meal) {
    const servings = path(['servings'], meal);
    return (
      <RecipeCard
        className={classes.card}
        recipe={path(['node'], meal)}
        renderBadge={() => `${servings} serving${servings !== 1 ? 's' : ''}`}
        variant={variant}
      />
    );
  }

  return null;
};

export default PlannedMeal;
