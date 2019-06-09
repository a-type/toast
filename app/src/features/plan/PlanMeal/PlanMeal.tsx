import React, { SFC } from 'react';
import { PlanMealData } from '../types';
import { TextSkeleton, CardSkeleton } from 'components/skeletons';
import EmptyMeal from './EmptyMeal';
import PlannedMeal from './PlannedMeal';
import { Box, Typography } from '@material-ui/core';

interface MealProps {
  planDayId: string;
  meal: PlanMealData;
  mealName: string;
  variant?: 'full' | 'compact';
}

const Meal: SFC<MealProps> = ({
  meal,
  mealName,
  planDayId,
  variant = 'full',
}) => {
  const empty = !meal;

  return (
    <Box m="0" flexDirection="column" display="flex">
      <Typography variant="caption" gutterBottom>
        {mealName}
      </Typography>
      {empty ? (
        <EmptyMeal planDayId={planDayId} mealName={mealName} />
      ) : (
        <PlannedMeal meal={meal} variant={variant} />
      )}
    </Box>
  );
};

export const MealSkeleton = ({ variant }) => (
  <Box m="0" flexDirection="column" display="flex">
    <Typography variant="caption" gutterBottom>
      <TextSkeleton />
    </Typography>
    <CardSkeleton variant={variant} />
  </Box>
);

export default Meal;
