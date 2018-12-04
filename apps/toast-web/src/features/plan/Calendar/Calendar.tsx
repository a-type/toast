import * as React from 'react';
import { PlanMeal, MealActionType } from 'generated/schema';
import { DayItem } from './components';
import { endOfMonth, isSameDay, startOfMonth } from 'date-fns';
import CalendarQuery from './CalendarQuery';
import { pathOr } from 'ramda';
import Calendar from 'components/generic/Calendar';
import getPrimaryAction from 'features/plan/getPrimaryAction';

export interface CalendarProps {
  onDatePick(date: Date): void;
  selectedDate: Date;
}

const INITIAL_START_DATE = startOfMonth(new Date());
const INITIAL_END_DATE = endOfMonth(INITIAL_START_DATE);

const PlanCalendar: React.SFC<CalendarProps> = ({
  onDatePick,
  selectedDate,
}) => {
  return (
    <CalendarQuery
      variables={{ startDate: INITIAL_START_DATE, endDate: INITIAL_END_DATE }}
    >
      {({ data, error, fetchMore, networkStatus }) => {
        const handleMonthChange = newMonthStartDay => {
          const newEndDay = endOfMonth(newMonthStartDay);
          fetchMore({
            variables: {
              startDate: newMonthStartDay,
              endDate: newEndDay,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) {
                return prev;
              }

              const clone = { ...prev };
              clone.group.plan.meals.push(...fetchMoreResult.group.plan.meals);
              return clone;
            },
          });
        };

        const meals = pathOr<PlanMeal[]>(
          [],
          ['group', 'plan', 'meals'],
          data,
        ) as PlanMeal[];

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
      }}
    </CalendarQuery>
  );
};

export default PlanCalendar;
