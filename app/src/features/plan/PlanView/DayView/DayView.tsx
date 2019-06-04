import React, { SFC } from 'react';
import { PlanDayData, PlanMealData } from '../../types';
import { Box } from 'grommet';
import { Heading } from 'components/text';
import { formatDay } from 'formatters/date';
import MealGrid from './MealGrid';
import Meal, { MealSkeleton } from 'features/plan/PlanMeal/PlanMeal';
import { HeadingSkeleton } from 'components/skeletons';
import { parse } from 'date-fns';
import { path } from 'ramda';

interface DayViewProps {
  day?: PlanDayData;
}

const DayView: SFC<DayViewProps> = ({ day }) => {
  if (!day) {
    return (
      <Box>
        <HeadingSkeleton level="1" />
        <MealGrid>
          <MealSkeleton />
          <MealSkeleton />
          <MealSkeleton />
        </MealGrid>
      </Box>
    );
  }

  const { date, cookingConnection } = day;
  const meals = path(['edges'], cookingConnection) as PlanMealData[];
  // TODO: support non-standard meals
  const standardMeals = ['breakfast', 'lunch', 'dinner'].map(
    mealName => meals.find(meal => meal.mealName === mealName) || null,
  );

  return (
    <Box>
      <Heading level="2">{formatDay(parse(date))}</Heading>
      <MealGrid>
        <Meal meal={standardMeals[0]} mealName="Breakfast" />
        <Meal meal={standardMeals[1]} mealName="Lunch" />
        <Meal meal={standardMeals[2]} mealName="Dinner" />
      </MealGrid>
    </Box>
  );
};

export default DayView;
