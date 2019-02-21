import * as React from 'react';
import { PlanMeal, MealActionType } from 'generated/schema';
import { DayItem } from './components';
import { endOfMonth, isSameDay } from 'date-fns';
import Calendar from 'components/generic/Calendar';
import getPrimaryAction from 'features/plan/getPrimaryAction';

export interface CalendarProps {
  onDatePick(date: Date): void;
  selectedDate: Date;
  meals: PlanMeal[];
  fetchMeals(params: { startDate: Date; endDate: Date }): void;
}

const PlanCalendar: React.SFC<CalendarProps> = ({
  onDatePick,
  selectedDate,
  fetchMeals,
  meals,
}) => {
  const handleMonthChange = newMonthStartDay => {
    const newEndDay = endOfMonth(newMonthStartDay);
    fetchMeals({
      startDate: newMonthStartDay,
      endDate: newEndDay,
    });
  };

  return (
    <Calendar
      onMonthChange={handleMonthChange}
      onChange={onDatePick}
      value={selectedDate}
      renderDate={({ date, props, selected }) => {
        const dayMeals = meals
          .filter(meal => isSameDay(meal.date, date))
          .sort((a, b) => a.mealIndex - b.mealIndex);

        if (!dayMeals.length) {
          return (
            <DayItem
              {...props}
              selected={selected}
              date={date}
              actionType={MealActionType.SKIP}
            />
          );
        }

        const action = getPrimaryAction(dayMeals);

        return (
          <DayItem
            {...props}
            actionType={action.type}
            date={date}
            selected={selected}
          />
        );
      }}
    />
  );
};

export default PlanCalendar;
