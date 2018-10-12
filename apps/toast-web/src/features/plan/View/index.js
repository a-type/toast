import React from 'react';
import DayView from './DayView';
import { Query } from 'react-apollo';
import gql from 'fraql';

const GetPlan = gql`
  query GetPlan {
    me {
      group {
        plan {
          id
          days {
            ${DayView.fragments.day}
          }
        }
      }
    }
  }
`;

export default () => (
  <Query query={GetPlan}>
    {({ data, loading, error }) => {
      if (loading || error) {
        return null;
      }

      return <DayView day={data.me.group.plan.days[0]} />;
    }}
  </Query>
);
