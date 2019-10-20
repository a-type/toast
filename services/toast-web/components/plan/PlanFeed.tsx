import React, { FC, useState, useMemo } from 'react';
import { PlanMealPlanMeal, PlanMeal } from './PlanMeal';
import {
  Box,
  Typography,
  IconButton,
  Button,
  makeStyles,
  Grid,
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
    const lastMeal = mealEdges.sort((a, b) =>
      compareAsc(a.node.date, b.node.date),
    )[mealEdges.length - 1];
    return lastMeal ? parse(lastMeal.node.date) : null;
  }, [mealEdges]);

  const dateRange = Math.max(
    14,
    endDate ? differenceInDays(startDate, endDate) : 0,
  );

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
          onRemovePlan={refetch}
          groupId={groupId}
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
  groupId: string;
  meals: PlanMealPlanMeal[];
  date: Date;
  onAddPlan: (params: { day: Date }) => any;
  onRemovePlan: () => any;
};

const usePlanFeedDayStyles = makeStyles(theme => ({
  grid: {
    marginBottom: theme.spacing(1),
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  planButton: {
    width: 'auto',
    alignSelf: 'flex-start',
  },
}));

const PlanFeedDay: FC<PlanFeedDayProps> = ({
  meals,
  date: day,
  onAddPlan,
  groupId,
  onRemovePlan,
}) => {
  const handleAddPlan = () => onAddPlan({ day });
  const classes = usePlanFeedDayStyles({ meals, day });

  return (
    <Box mb={5} display="flex" flexDirection="column">
      <Typography variant="overline">
        <FormattedDate date={day} />
      </Typography>
      <Grid container spacing={2} className={classes.grid}>
        {meals.map(meal => (
          <Grid
            item
            key={`${meal.id}`}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className={classes.gridItem}
          >
            <PlanMeal meal={meal} groupId={groupId} onRemove={onRemovePlan} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="outlined"
        onClick={handleAddPlan}
        className={classes.planButton}
      >
        <AddTwoTone />
        Plan something
      </Button>
    </Box>
  );
};
