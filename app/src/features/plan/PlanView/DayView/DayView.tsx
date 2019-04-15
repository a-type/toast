import React, { SFC } from 'react';
import { PlanDayData } from '../../types';
import { Heading, Box } from 'grommet';
import { formatDay } from 'formatters/date';
import MealGrid from './MealGrid';
import Meal, { MealSkeleton } from 'features/plan/PlanMeal/PlanMeal';
import { HeadingSkeleton } from 'components/skeletons';
import { parse } from 'date-fns';

interface DayViewProps {
  day?: PlanDayData;
}

const DayView: SFC<DayViewProps> = ({ day }) => {
  if (!day) {
    return (
      <Box>
        <HeadingSkeleton />
        <MealGrid>
          <MealSkeleton />
          <MealSkeleton />
          <MealSkeleton />
        </MealGrid>
      </Box>
    );
  }

  const { date, breakfast, lunch, dinner } = day;

  return (
    <Box>
      <Heading>{formatDay(parse(date))}</Heading>
      <MealGrid>
        <Meal meal={breakfast} mealName="Breakfast" />
        <Meal meal={lunch} mealName="Lunch" />
        <Meal meal={dinner} mealName="Dinner" />
      </MealGrid>
    </Box>
  );
};

export default DayView;