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
  loadNextWeek(): void;
}

const CalendarWeeklyView: React.SFC<CalendarWeeklyViewProps> = ({
  meals,
  groceryDay,
  setActiveDateIndex,
  loadNextWeek,
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
        <Button onClick={loadNextWeek}>Next</Button>
      </Controls>
    </div>
  );
};

export default CalendarWeeklyView;
