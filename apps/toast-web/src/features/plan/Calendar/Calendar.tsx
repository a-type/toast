import * as React from 'react';
import CalendarPlanQuery from './CalendarPlanQuery';
import { GlobalLoader } from 'components/generic/Loader';
import { Disconnected } from 'components/generic';
import { Content } from 'components/layouts';
import { addDays, isSameDay } from 'date-fns';
import logger from 'logger';
import { pathOr } from 'ramda';
import CalendarWeeklyView from './WeekView';
import CalendarDayView from './DayView';
import { PlanMeal } from 'generated/schema';
import { cold } from 'react-hot-loader';
import { Redirect } from 'react-router-dom';
import GroceryDayBanner from '../GroceryDayBanner';

interface CalendarProps {
  date: Date;
}

interface CalendarViewProps {
  meals: PlanMeal[];
  groceryDay: number;
}

const CalendarView: React.SFC<CalendarViewProps> = cold(
  ({ meals, groceryDay }) => {
    const [dateIndex, setDateIndex] = React.useState(meals[0].dateIndex);

    const dayMeals = meals
      .filter(meal => meal.dateIndex === dateIndex)
      .sort((a, b) => a.mealIndex - b.mealIndex);

    return (
      <React.Fragment>
        <GroceryDayBanner groceryDay={groceryDay} />
        <Content contentArea="secondary">
          <CalendarWeeklyView
            setActiveDateIndex={setDateIndex}
            meals={meals}
            groceryDay={groceryDay}
          />
        </Content>
        <Content contentArea="main">
          <CalendarDayView meals={dayMeals} />
        </Content>
      </React.Fragment>
    );
  },
);

const Calendar: React.SFC<CalendarProps> = ({ date }) => {
  return (
    <CalendarPlanQuery
      variables={{ startDate: date, endDate: addDays(date, 7) }}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return <GlobalLoader />;
        }

        if (error) {
          logger.fatal(error);
          return <Disconnected />;
        }

        if (!data || !data.group) {
          return <Redirect to="/plan/setup" />;
        }

        const groceryDay = pathOr(0, ['group', 'plan', 'groceryDay'], data);
        const meals = pathOr(
          [],
          ['group', 'plan', 'meals'],
          data,
        ) as PlanMeal[];

        return <CalendarView meals={meals} groceryDay={groceryDay} />;
      }}
    </CalendarPlanQuery>
  );
};

export default cold(Calendar);
