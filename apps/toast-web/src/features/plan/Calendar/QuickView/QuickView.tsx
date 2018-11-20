import * as React from 'react';
import CalendarPlanQuery from '../CalendarPlanQuery';
import { addDays } from 'date-fns';
import { GlobalLoader } from 'components/generic/Loader';
import { Disconnected } from 'components/generic';
import logger from 'logger';
import { pathOr } from 'ramda';
import { PlanMeal } from 'generated/schema';
import CalendarWeeklyView from '../WeekView';

const CalendarQuickView: React.SFC<{}> = ({ }) => {
  const today = new Date();

  return (
    <CalendarPlanQuery
      variables={{ startDate: today, endDate: addDays(today, 3) }}
    >
      {({ data, loading, error }) => {
        if (loading) {
          // TODO: skeleton
          return <GlobalLoader />;
        }

        if (error) {
          logger.fatal(error);
          return <Disconnected />;
        }

        const groceryDay = pathOr(0, ['plan', 'groceryDay'], data);
        const meals = pathOr(null, ['plan', 'meals'], data) as PlanMeal[];

        return (
          <CalendarWeeklyView
            setActiveSection={() => {}}
            meals={meals}
            groceryDay={groceryDay}
          />
        );
      }}
    </CalendarPlanQuery>
  )
}

export default CalendarQuickView;
