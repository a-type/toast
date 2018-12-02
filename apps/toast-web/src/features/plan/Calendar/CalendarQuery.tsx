import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { Calendar } from 'generated/schema';
import fragments from './fragments';

export const Document = gql`
  query Calendar($startDate: Date!, $endDate: Date!) {
    group {
      plan {
        id

        ...CalendarPlan

        meals(startDate: $startDate, endDate: $endDate) {
          ...CalendarMeals
        }
      }
    }
  }

  ${fragments.plan}
  ${fragments.meals}
`;

interface CalendarQueryProps {
  variables?: Calendar.Variables;
  skip?: boolean;
  children(
    result: QueryResult<Calendar.Query, Calendar.Variables>,
  ): React.ReactNode;
}

const CalendarQuery: React.SFC<CalendarQueryProps> = props => (
  <Query<Calendar.Query, Calendar.Variables> query={Document} {...props} />
);

export default CalendarQuery;
