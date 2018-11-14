import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { CalendarPlan } from 'generated/schema';
import CalendarMeal from './CalendarMeal';

export const Document = gql`
  query CalendarPlan($weekIndex: Int!) {
    schedule {
      id
      groceryDay
    }

    week(weekIndex: $weekIndex) {
      startDate
      id
      meals {
        id
        weekIndex
        dayIndex
        mealIndex
        ...CalendarMeal
      }
    }
  }

  ${CalendarMeal.fragments.meal}
`;

interface CalendarPlanQueryProps {
  variables?: CalendarPlan.Variables;
  skip?: boolean;
  children(
    result: QueryResult<CalendarPlan.Query, CalendarPlan.Variables>,
  ): React.ReactNode;
}

const CalendarPlanQuery: React.SFC<CalendarPlanQueryProps> = props => (
  <Query<CalendarPlan.Query, CalendarPlan.Variables>
    query={Document}
    {...props}
  />
);

export default CalendarPlanQuery;
