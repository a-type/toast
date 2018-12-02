import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import { H1 } from 'components/typeset';
import { formatDay } from 'formatters/date';
import Meals from './Meals';
import { cold } from 'react-hot-loader';
import DayViewQuery from './DayViewQuery';
import { startOfDay } from 'date-fns';
import Calendar from '../Calendar';
import { pathOr } from 'ramda';

const CalendarDayView: React.SFC<{}> = ({ ...rest }) => {
  const [date, setDate] = React.useState(startOfDay(new Date()));

  return (
    <DayViewQuery variables={{ date }}>
      {({ data, loading, error }) => {
        if (loading || error) {
          return null;
        }

        const meals = pathOr<PlanMeal[]>([], ['group', 'plan', 'meals'], data);

        return (
          <React.Fragment>
            <H1>{formatDay(date)}</H1>
            <Meals meals={meals} {...rest} />
            <Calendar onDatePick={setDate} selectedDate={date} />
          </React.Fragment>
        );
      }}
    </DayViewQuery>
  );
};

export default cold(CalendarDayView);
