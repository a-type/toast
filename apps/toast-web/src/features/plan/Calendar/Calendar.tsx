import * as React from 'react';
import CalendarPlanQuery from './CalendarPlanQuery';
import { GlobalLoader } from 'components/generic/Loader';
import { Disconnected } from 'components/generic';
import { Content } from 'components/layouts';
import { addDays, differenceInDays, isSameDay } from 'date-fns';
import logger from 'logger';
import LandingPage from 'features/plan/LandingPage';
import { pathOr } from 'ramda';
import CalendarWeeklyView from './WeekView';
import CalendarDayView from './DayView';
import { PlanMeal } from 'generated/schema';
import { cold } from 'react-hot-loader';
import GroceryDayBanner from '../GroceryDayBanner';

interface CalendarProps {
  date: Date;
}

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

        if (!data || !data.plan) {
          return <LandingPage />;
        }

        const groceryDay = pathOr(0, ['plan', 'groceryDay'], data);
        const meals = pathOr(null, ['plan', 'meals'], data) as PlanMeal[];

        const dayMeals = meals
          .filter(meal => isSameDay(meal.date, date))
          .sort((a, b) => a.mealIndex - b.mealIndex);

        return (
          <React.Fragment>
            <GroceryDayBanner groceryDay={groceryDay} />
            <Content contentArea="secondary">
              <CalendarWeeklyView
                setActiveSection={() => {}}
                meals={meals}
                groceryDay={groceryDay}
              />
            </Content>
            <Content contentArea="main">
              <CalendarDayView setActiveSection={() => {}} meals={dayMeals} />
            </Content>
          </React.Fragment>
        );
      }}
    </CalendarPlanQuery>
  );
};

export default cold(Calendar);
