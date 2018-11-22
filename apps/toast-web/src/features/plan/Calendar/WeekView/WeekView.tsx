import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import CalendarDay from './CalendarDay';
import { Controls } from 'components/layouts';
import { Link, Button } from 'components/generic';
import { formatDateOnly } from 'formatters/date';
import groupMeals from 'features/plan/groupMeals';
import { subDays, addDays } from 'date-fns';

interface CalendarWeeklyViewProps {
  meals: PlanMeal[];
  groceryDay: number;
  setActiveDateIndex(dateIndex: number): void;
}

const CalendarWeeklyView: React.SFC<CalendarWeeklyViewProps> = ({
  meals,
  groceryDay,
  setActiveDateIndex,
  ...rest
}) => {
  // group by day
  const mealDays = groupMeals(meals);

  return (
    <div {...rest}>
      {mealDays.map((dayMeals, index) => (
        <CalendarDay
          key={`day_${index}`}
          meals={dayMeals}
          groceryDay={groceryDay}
          onSelect={() => setActiveDateIndex(dayMeals[0].dateIndex)}
        />
      ))}
      <Controls>
        <Link to={`/plan/${formatDateOnly(subDays(meals[0].date, 7))}/0`}>
          <Button>Previous</Button>
        </Link>
        <Link to={`/plan/${formatDateOnly(addDays(meals[0].date, 7))}/0`}>
          <Button>Next</Button>
        </Link>
      </Controls>
    </div>
  );
};

export default CalendarWeeklyView;
