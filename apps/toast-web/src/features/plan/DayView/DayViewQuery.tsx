import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { DayView } from 'generated/schema';
import fragments from './fragments';
import calendarFragments from 'features/plan/Calendar/fragments';

export const Document = gql`
  query DayView($startDate: Date!, $endDate: Date!) {
    group {
      id
      plan {
        id
        ...CalendarPlan

        meals(startDate: $startDate, endDate: $endDate) {
          id
          ...CalendarMeals
          ...CalendarDayViewMeals
        }
      }
    }
  }

  ${fragments.meals}
  ${calendarFragments.plan}
  ${calendarFragments.meals}
`;

interface DayViewQueryProps {
  variables?: DayView.Variables;
  skip?: boolean;
  children(
    result: QueryResult<DayView.Query, DayView.Variables>,
  ): React.ReactNode;
}

const DayViewQuery: React.SFC<DayViewQueryProps> = props => (
  <Query<DayView.Query, DayView.Variables>
    query={Document}
    partialRefetch
    fetchPolicy="cache-first"
    {...props}
  />
);

export default DayViewQuery;
