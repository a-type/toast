import React, { FC } from 'react';
import { isSameDay, isBefore, setHours } from 'date-fns';
import { PlanDayData } from '../types';
import { sentence } from 'change-case';
import { PlanMealSummary } from './MealSummary';
import { ApolloError } from 'apollo-boost';
import ErrorMessage from 'components/generic/ErrorMessage';
import { LabelSkeleton } from 'components/skeletons';
import { SpotlightSkeleton } from 'features/recipes/components/Spotlight';
import { Box, Button, Typography } from '@material-ui/core';
import Link from 'components/generic/Link';

interface PlanSummaryProps {
  planDays: PlanDayData[];
  loading: boolean;
  error?: ApolloError;
}

export const PlanSummary: FC<PlanSummaryProps> = ({
  planDays,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <Box alignItems="start" mb={3}>
        <LabelSkeleton />
        <SpotlightSkeleton />
        <Link to="/plan">
          <Button>Go to plan</Button>
        </Link>
      </Box>
    );
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const today = planDays.find(day =>
    isSameDay(new Date(), day.date),
  ) as PlanDayData;

  const now = new Date();
  const breakfastTime = setHours(now, 9);
  const lunchTime = setHours(now, 12);
  const nextMeal = isBefore(now, breakfastTime)
    ? 'breakfast'
    : isBefore(now, lunchTime)
    ? 'lunch'
    : 'dinner';

  const meal =
    (today &&
      today.cookingConnection.edges.find(edge => edge.mealName === nextMeal)) ||
    null;

  return (
    <Box alignItems="start" mb={3}>
      <Typography variant="overline">Today - {sentence(nextMeal)}</Typography>
      <PlanMealSummary meal={meal} />
    </Box>
  );
};

export default PlanSummary;
