import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { CalendarPlan } from 'generated/schema';
import { CalendarDay } from './components';

export const Document = gql`
  query CalendarPlan($weekIndex: Int!) {
    me {
      id
      group {
        id
        plan {
          id
          week(weekIndex: $weekIndex) {
            startDate
            id
            days {
              ...CalendarDay
            }
          }
        }
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
