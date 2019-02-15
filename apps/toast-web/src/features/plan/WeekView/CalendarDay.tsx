import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import CalendarMeal from '../MealView';
import { MealRow, Link, PositiveText } from './components';
import { isPast, endOfDay, getDay } from 'date-fns';
import { formatDay } from 'formatters/date';
import { Heading } from 'grommet';

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
      <Heading level="3" margin={{ bottom: 'small' }}>
        {formatDay(date)}{' '}
        {groceryDay === getDay(date) && (
          <PositiveText>Grocery Day</PositiveText>
        )}
      </Heading>
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
