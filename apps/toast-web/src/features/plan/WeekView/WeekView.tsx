import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import CalendarDay from './CalendarDay';
import { Button } from 'components/generic';
import groupMeals from 'features/plan/groupMeals';

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
      <Button onClick={loadNextWeek} label="Next" />
    </div>
  );
};

export default CalendarWeeklyView;
