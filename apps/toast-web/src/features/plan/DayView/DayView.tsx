import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import { H1 } from 'components/typeset';
import { formatDay } from 'formatters/date';
import Meals, { Skeleton as MealsSkeleton } from './Meals';
import { cold } from 'react-hot-loader';
import DayViewQuery from './DayViewQuery';
import { startOfDay } from 'date-fns';
import Calendar from '../Calendar';
import { pathOr } from 'ramda';
import { Redirect } from 'react-router-dom';

const CalendarDayView: React.SFC<{}> = ({ ...rest }) => {
  const [date, setDate] = React.useState(startOfDay(new Date()));

  return (
    <React.Fragment>
      <DayViewQuery variables={{ date }}>
        {({ data, loading, error, networkStatus }) => {
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

          const meals = pathOr<PlanMeal[]>(
            [],
            ['group', 'plan', 'meals'],
            data,
          );

          return (
            <React.Fragment>
              <H1>{formatDay(date)}</H1>
              <Meals meals={meals} {...rest} />
            </React.Fragment>
          );
        }}
      </DayViewQuery>
      <Calendar onDatePick={setDate} selectedDate={date} />
    </React.Fragment>
  );
};

export default cold(CalendarDayView);
