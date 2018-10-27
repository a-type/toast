import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import gql from 'graphql-tag';
import { GetPlan } from 'generated/schema';
import { DayView } from './components';

export const Document = gql`
  query GetPlan($weekIndex: Int!) {
    me {
      group {
        plan {
          id
          week(weekIndex: $weekIndex) {
            startDate
            id
            days {
              ...DayView
            }
          }
        }
      }
    }
  }

  ${DayView.fragments.day}
`;

interface GetPlanQueryProps {
  variables?: GetPlan.Variables;
  skip?: boolean;
  children(
    result: QueryResult<GetPlan.Query, GetPlan.Variables>,
  ): React.ReactNode;
}

const GetPlanQuery: React.SFC<GetPlanQueryProps> = props => (
  <Query<GetPlan.Query, GetPlan.Variables> query={Document} {...props} />
);

export default GetPlanQuery;
