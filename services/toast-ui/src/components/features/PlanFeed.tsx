import React, { FC, useState, useMemo } from 'react';
import { PlanMealPlanMeal, PlanMeal } from './PlanMeal';
import {
  Box,
  Typography,
  IconButton,
  Button,
  makeStyles,
} from '@material-ui/core';
import {
  addDays,
  startOfToday,
  isSameDay,
  compareAsc,
  parse,
  differenceInDays,
} from 'date-fns';
import { FormattedDate } from 'components/generic/FormattedDate';
import { AddTwoTone } from '@material-ui/icons';
import { PlanAddModal } from './PlanAddModal';

export type PlanFeedProps = {
  startDate: Date;
  mealEdges: PlanFeedMealEdge[];
  groupId: string;
  refetch: () => any;
  fetchMore: () => any;
  hasNextPage: boolean;
};

export type PlanFeedMealEdge = {
  node: PlanMealPlanMeal;
};

export const PlanFeed: FC<PlanFeedProps> = ({
  mealEdges,
  groupId,
  refetch,
  startDate,
  hasNextPage,
  fetchMore,
}) => {
  const endDate: Date = useMemo(() => {
    const lastMeal = mealEdges
      .sort((a, b) => compareAsc(a.node.date, b.node.date))
      .pop();
    return parse(lastMeal.node.date);
  }, [mealEdges]);

  const dateRange = Math.max(14, differenceInDays(startDate, endDate));
  const dates = new Array(dateRange)
    .fill(null)
    .map((_, idx) => addDays(startDate, idx));

  const mealsGroupedByDay = useMemo(
    () =>
      dates.map(date => {
        const meals = mealEdges.filter(mealEdge =>
          isSameDay(mealEdge.node.date, date),
        );
        return {
          date,
          meals: meals.map(({ node }) => node),
        };
      }),
    [mealEdges, dates],
  );

  const [addModalDay, setAddModalDay] = useState<Date>(null);
  const onAddPlan = ({ day }: { day: Date }) => setAddModalDay(day);
  const onCloseAddPlan = () => setAddModalDay(null);

  return (
    <Box>
      {mealsGroupedByDay.map(group => (
        <PlanFeedDay
          meals={group.meals}
          date={group.date}
          key={group.date.getTime()}
          onAddPlan={onAddPlan}
        />
      ))}
      {hasNextPage && <Button onClick={fetchMore}>Load more</Button>}
      {addModalDay && (
        <PlanAddModal
          onClose={onCloseAddPlan}
          day={addModalDay}
          groupId={groupId}
          onAdd={refetch}
        />
      )}
    </Box>
  );
};

type PlanFeedDayProps = {
  meals: PlanMealPlanMeal[];
  date: Date;
  onAddPlan: (params: { day: Date }) => any;
};

const usePlanFeedDayStyles = makeStyles(theme => ({
  planButton: {
    alignSelf: 'flex-start',
  },
}));

const PlanFeedDay: FC<PlanFeedDayProps> = ({ meals, date: day, onAddPlan }) => {
  const handleAddPlan = () => onAddPlan({ day });
  const classes = usePlanFeedDayStyles({ meals, day });

  return (
    <Box mb={3} display="flex" flexDirection="column">
      <Typography variant="overline">
        <FormattedDate date={day} />
      </Typography>
      {meals.length ? (
        meals.map(meal => (
          <Box mb={2}>
            <PlanMeal meal={meal} key={meal.id} />
          </Box>
        ))
      ) : (
        <Typography variant="caption" paragraph>
          Nothing planned
        </Typography>
      )}
      <Button onClick={handleAddPlan} className={classes.planButton}>
        <AddTwoTone />
        Plan something
      </Button>
    </Box>
  );
};
