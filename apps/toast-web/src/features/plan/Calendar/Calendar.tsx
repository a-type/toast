import * as React from 'react';
import CalendarPlanQuery from './CalendarPlanQuery';
import { GlobalLoader } from 'components/generic/Loader';
import { Disconnected } from 'components/generic';
import { addDays, differenceInDays, isSameDay } from 'date-fns';
import logger from 'logger';
import LandingPage from 'features/plan/LandingPage';
import { pathOr } from 'ramda';
import { Layout } from './components';
import CalendarWeeklyView from './WeekView';
import CalendarDayView from './DayView';
import { useMedia } from 'react-use';
import { PlanMeal } from 'generated/schema';
import { cold } from 'react-hot-loader';
import GroceryDayBanner from '../GroceryDayBanner';

const getDayIndex = (
  today: Date,
  planStartWeekDate: number,
  planWeekIndex: number,
) => {
  const startDate = addDays(new Date(planStartWeekDate), planWeekIndex * 7);
  return Math.max(0, Math.min(6, differenceInDays(today, startDate)));
};

interface CalendarProps {
  date: Date;
}

const Calendar: React.SFC<CalendarProps> = ({ date }) => {
  const [activeSection, setActiveSection] = React.useState<'day' | 'calendar'>(
    'day',
  );
  const isWide = useMedia('(min-width: 1000px)');

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
            <Layout isWide={isWide}>
              {(isWide || activeSection === 'calendar') && (
                <CalendarWeeklyView
                  setActiveSection={setActiveSection}
                  meals={meals}
                  groceryDay={groceryDay}
                  data-grid-area="calendar"
                />
              )}
              {(isWide || activeSection === 'day') && (
                <CalendarDayView
                  setActiveSection={setActiveSection}
                  meals={dayMeals}
                  data-grid-area="day"
                />
              )}
            </Layout>
          </React.Fragment>
        );
      }}
    </CalendarPlanQuery>
  );
};

export default cold(Calendar);
