import React, { SFC } from 'react';
import { PlanDayData, PlanMealData } from '../../types';
import { formatDay } from 'formatters/date';
import MealGrid from './MealGrid';
import Meal, { MealSkeleton } from 'features/plan/PlanMeal/PlanMeal';
import { HeadingSkeleton } from 'components/skeletons';
import { parse } from 'date-fns';
import { path } from 'ramda';
import { Box, Typography } from '@material-ui/core';

interface DayViewProps {
  day?: PlanDayData;
}

const DayView: SFC<DayViewProps> = ({ day }) => {
  if (!day) {
    return (
      <Box>
        <HeadingSkeleton level="1" />
        <MealGrid>
          <MealSkeleton variant="compact" />
          <MealSkeleton variant="compact" />
          <MealSkeleton variant="full" />
        </MealGrid>
      </Box>
    );
  }

  const { date } = day;
  const meals = path(['cookingConnection', 'edges'], day) as PlanMealData[];
  // TODO: support non-standard meals
  const standardMeals = ['breakfast', 'lunch', 'dinner'].map(
    mealName =>
      meals.find(
        meal => meal.mealName.toLowerCase() === mealName.toLowerCase(),
      ) || null,
  );

  return (
    <Box>
      <Typography gutterBottom variant="h2">
        {formatDay(parse(date))}
      </Typography>
      <MealGrid>
        <Meal
          planDayId={day.id}
          meal={standardMeals[0]}
          mealName="Breakfast"
          variant="compact"
        />
        <Meal
          planDayId={day.id}
          meal={standardMeals[1]}
          mealName="Lunch"
          variant="compact"
        />
        <Meal planDayId={day.id} meal={standardMeals[2]} mealName="Dinner" />
      </MealGrid>
    </Box>
  );
};

export default DayView;
