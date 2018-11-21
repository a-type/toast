import * as React from 'react';
import CalendarPlanQuery from '../CalendarPlanQuery';
import { addDays } from 'date-fns';
import { Loader, Disconnected } from 'components/generic';
import { Content, LayoutTypes } from 'components/layouts';
import logger from 'logger';
import { pathOr } from 'ramda';
import { PlanMeal } from 'generated/schema';
import CalendarWeeklyView from '../WeekView';
import { H1 } from 'components/typeset';

export interface CalendarQuickViewProps {
  contentArea?: LayoutTypes.ContentArea;
}

const CalendarQuickView: React.SFC<CalendarQuickViewProps> = props => {
  const today = new Date();

  return (
    <Content {...props}>
      <H1>Coming up</H1>
      <CalendarPlanQuery
        variables={{ startDate: today, endDate: addDays(today, 3) }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            // TODO: skeleton
            return <Loader size={48} />;
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
    </Content>
  );
};

export default CalendarQuickView;
