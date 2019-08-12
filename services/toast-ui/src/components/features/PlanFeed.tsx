import React, { FC, useState, useMemo } from 'react';
import { PlanMealPlanMeal, PlanMeal } from './PlanMeal';
import { Box, Typography, IconButton, Button } from '@material-ui/core';
import { addDays, startOfToday, isSameDay } from 'date-fns';
import { FormattedDate } from 'components/generic/FormattedDate';
import { AddTwoTone } from '@material-ui/icons';

export type PlanFeedProps = {
  mealEdges: PlanFeedMealEdge[];
};

export type PlanFeedMealEdge = {
  cursor: string;
  node: PlanMealPlanMeal;
};

export const PlanFeed: FC<PlanFeedProps> = ({ mealEdges }) => {
  const [visibleDayCount, setVisibleDayCount] = useState(14);

  const visibleDays = useMemo(
    () =>
      new Array(visibleDayCount)
        .fill(null)
        .map((_, dayIdx) => addDays(startOfToday(), dayIdx)),
    [visibleDayCount],
  );

  const mealsGroupedByDay = visibleDays.map(day => {
    const meals = mealEdges.filter(mealEdge =>
      isSameDay(day, mealEdge.node.date),
    );
    return {
      day,
      meals: meals.map(({ node }) => node),
      lastCursor: meals.length ? meals[meals.length - 1].cursor : null,
      firstCursor: meals.length ? meals[0].cursor : null,
    };
  });

  const onAddPlan = ({ day }: { day: Date }) => {};

  return (
    <Box>
      {mealsGroupedByDay.map(group => (
        <PlanFeedDay
          {...group}
          key={group.day.getTime()}
          onAddPlan={onAddPlan}
        />
      ))}
    </Box>
  );
};

type PlanFeedDayProps = {
  meals: PlanMealPlanMeal[];
  day: Date;
  lastCursor: string;
  firstCursor: string;
  onAddPlan: (params: { day: Date }) => any;
};

const PlanFeedDay: FC<PlanFeedDayProps> = ({ meals, day, onAddPlan }) => {
  const handleAddPlan = () => onAddPlan({ day });

  return (
    <Box mb={3} display="flex" flexDirection="column">
      <Typography variant="overline">
        <FormattedDate date={day} />
      </Typography>
      {meals.length ? (
        meals.map(meal => <PlanMeal meal={meal} key={meal.id} />)
      ) : (
        <Typography variant="caption" paragraph>
          Nothing planned
        </Typography>
      )}
      <Button onClick={handleAddPlan} style={{ alignSelf: 'flex-start' }}>
        <AddTwoTone />
        Plan something
      </Button>
    </Box>
  );
};
