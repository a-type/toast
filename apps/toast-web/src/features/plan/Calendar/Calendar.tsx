import * as React from 'react';
import { PlanMeal } from 'generated/schema';
import { DayItem } from './components';
import { startOfMonth, endOfMonth } from 'date-fns';
import CalendarQuery from './CalendarQuery';
import { pathOr } from 'ramda';
import Calendar from 'react-calendar';

export interface CalendarProps {
  onDatePick(date: Date): void;
  selectedDate: Date;
}

const PlanCalendar: React.SFC<CalendarProps> = ({
  onDatePick,
  selectedDate,
}) => {
  const [startDate, setStartDate] = React.useState(startOfMonth(new Date()));
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
            onActiveDateChange={({ activeStartDate }) =>
              setStartDate(activeStartDate)
            }
            onChange={onDatePick}
            value={selectedDate}
            tileContent={({ date, view }) => {
              const dayMeals = meals
                .filter(meal => meal.date === date)
                .sort((a, b) => a.mealIndex - b.mealIndex);
              if (!dayMeals.length) {
                return null;
              }

              return (
                <DayItem
                  meals={dayMeals}
                  date={dayMeals[0].date}
                  onSelected={() => onDatePick(dayMeals[0].date)}
                  selected={selectedDate === dayMeals[0].date}
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
