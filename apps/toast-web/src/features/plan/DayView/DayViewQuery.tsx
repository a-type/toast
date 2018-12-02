import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { DayView } from 'generated/schema';
import fragments from './fragments';

export const Document = gql`
  query DayView($date: Date!) {
    group {
      plan {
        id

        meals(startDate: $date) {
          ...CalendarDayViewMeals
        }
      }
    }
  }

  ${fragments.meals}
`;

interface DayViewQueryProps {
  variables?: DayView.Variables;
  skip?: boolean;
  children(
    result: QueryResult<DayView.Query, DayView.Variables>,
  ): React.ReactNode;
}

const DayViewQuery: React.SFC<DayViewQueryProps> = props => (
  <Query<DayView.Query, DayView.Variables> query={Document} {...props} />
);

export default DayViewQuery;
