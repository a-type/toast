import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import { H1 } from 'components/typeset';
import { formatDay } from 'formatters/date';
import Meals, { Skeleton as MealsSkeleton } from './Meals';
import { cold } from 'react-hot-loader';
import DayViewQuery from './DayViewQuery';
import { startOfDay, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import Calendar from '../Calendar';
import { pathOr } from 'ramda';
import { Redirect } from 'react-router-dom';

const INITIAL_START_DATE = startOfMonth(new Date());
const INITIAL_END_DATE = endOfMonth(INITIAL_START_DATE);

const CalendarDayView: React.SFC<{}> = ({ ...rest }) => {
  const [date, setDate] = React.useState(startOfDay(new Date()));

  return (
    <DayViewQuery
      variables={{ startDate: INITIAL_START_DATE, endDate: INITIAL_END_DATE }}
    >
      {({ data, error, networkStatus, fetchMore }) => {
        if (networkStatus < 4 || error) {
          return (
            <React.Fragment>
              <H1>...</H1>
              <MealsSkeleton />
            </React.Fragment>
          );
        }

        if (networkStatus === 7 && (!data.group || !data.group.plan)) {
          return <Redirect to="/plan/setup" />;
        }

        const meals = pathOr<PlanMeal[]>([], ['group', 'plan', 'meals'], data);
        const dayMeals = meals
          .filter(meal => isSameDay(meal.date, date))
          .sort((a, b) => a.mealIndex - b.mealIndex);

        const fetchMeals = ({ startDate, endDate }) => {
          fetchMore({
            variables: {
              startDate,
              endDate,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }

              const clone = { ...prev };
              clone.group.plan.meals.push(...fetchMoreResult.group.plan.meals);
              return clone;
            },
          });
        };

        return (
          <React.Fragment>
            <H1>{formatDay(date)}</H1>
            <Meals meals={dayMeals} {...rest} />
            <Calendar
              onDatePick={setDate}
              selectedDate={date}
              meals={meals}
              fetchMeals={fetchMeals}
            />
          </React.Fragment>
        );
      }}
    </DayViewQuery>
  );
};

export default cold(CalendarDayView);
