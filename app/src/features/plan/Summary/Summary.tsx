import React, { FC } from 'react';
import { Loader, Link } from 'components/generic';
import { isSameDay, isBefore, setHours } from 'date-fns';
import { Box, Button } from 'grommet';
import { Label } from 'components/text';
import { PlanDayData } from '../types';
import { sentence } from 'change-case';
import { PlanMealSummary } from './MealSummary';
import { ApolloError } from 'apollo-boost';
import ErrorMessage from 'components/generic/ErrorMessage';
import { BoxSkeleton } from 'components/skeletons/Box';
import { LabelSkeleton } from 'components/skeletons';
import { SpotlightSkeleton } from 'features/recipes/components/Spotlight';

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
      <Box align="start" margin={{ bottom: 'large' }}>
        <LabelSkeleton />
        <SpotlightSkeleton />
        <Link to="/plan">
          <Button label="Go to plan" />
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

  const meal = (today && today[nextMeal]) || null;

  return (
    <Box align="start" margin={{ bottom: 'large' }}>
      <Label>Today - {sentence(nextMeal)}</Label>
      <Box margin={{ bottom: 'small' }}>
        <PlanMealSummary meal={meal} />
      </Box>
      <Link to="/plan">
        <Button label="Go to plan" />
      </Link>
    </Box>
  );
};

export default PlanSummary;
