import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import CalendarMeal from '../CalendarMeal';
import { MealRow, Link, PositiveText } from './components';
import { isPast, endOfDay, getDay } from 'date-fns';
import { H3 } from 'components/typeset';
import { formatDay } from 'formatters/date';

type Props = {
  meals: PlanMeal[];
  onSelect(): void;
  groceryDay: number;
};

type CalendarDayComponent = React.SFC<Props> & {
  fragments: {};
};

const CalendarDay: CalendarDayComponent = ({ meals, onSelect, groceryDay }) => {
  const date = meals[0].date;

  const past = isPast(endOfDay(date));

  return (
    <Link
      onClick={ev => {
        ev.preventDefault();
        onSelect();
      }}
    >
      <H3 spaceBelow="sm">
        {formatDay(date)}{' '}
        {groceryDay === getDay(date) && (
          <PositiveText>Grocery Day</PositiveText>
        )}
      </H3>
      <MealRow past={past}>
        {meals.map(meal => (
          <CalendarMeal key={meal.id} meal={meal} />
        ))}
      </MealRow>
    </Link>
  );
};

CalendarDay.fragments = {
  meals: CalendarMeal.fragments.meal,
};

export default CalendarDay;
