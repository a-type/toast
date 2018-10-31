import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { CalendarPlan } from 'generated/schema';
import CalendarDay from './WeekView/CalendarDay';

export const Document = gql`
  query CalendarPlan($weekIndex: Int!) {
    week(weekIndex: $weekIndex) {
      startDate
      id
      days {
        ...CalendarDay
      }
    }
  }

  ${CalendarDay.fragments.day}
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
