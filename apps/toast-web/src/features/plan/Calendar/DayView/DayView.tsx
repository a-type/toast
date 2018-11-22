import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import { H1 } from 'components/typeset';
import { formatDay } from 'formatters/date';
import Meals from './Meals';

interface CalendarDayViewProps {
  meals: PlanMeal[];
}

const CalendarDayView: React.SFC<CalendarDayViewProps> = ({
  meals,
  ...rest
}) => {
  const date = meals[0].date;

  return (
    <div {...rest}>
      <H1>{formatDay(date)}</H1>
      <Meals meals={meals} />
    </div>
  );
};

export default CalendarDayView;
