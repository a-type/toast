import * as React from 'react';
import { PlanMeal, MealActionType } from 'generated/schema';
import { DayItem } from './components';
import { startOfMonth, endOfMonth, getMonth } from 'date-fns';
import CalendarQuery from './CalendarQuery';
import { pathOr } from 'ramda';
import Calendar from 'components/generic/Calendar';
import getPrimaryAction from 'features/plan/getPrimaryAction';

export interface CalendarProps {
  onDatePick(date: Date): void;
  selectedDate: Date;
}

const PlanCalendar: React.SFC<CalendarProps> = ({
  onDatePick,
  selectedDate,
}) => {
  const [startDate, setMonth] = React.useState(new Date());
  const endDate = endOfMonth(startDate);

  return (
    <CalendarQuery variables={{ startDate, endDate }}>
      {({ data, loading, error }) => {
        if (loading || error) {
          return null;
        }

        const meals = pathOr<PlanMeal[]>(
          [],
          ['group', 'plan', 'meals'],
          data,
        ) as PlanMeal[];

        return (
          <Calendar
            onMonthChange={setMonth}
            onChange={onDatePick}
            value={selectedDate}
            renderDate={({ date, props, selected }) => {
              const dayMeals = meals
                .filter(meal => meal.date === date)
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
      }}
    </CalendarQuery>
  );
};

export default PlanCalendar;
