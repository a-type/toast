import React from 'react';
import gql from 'fraql';
import { Query } from 'react-apollo';
import Day from './Day';
import { pathOr } from 'ramda';
import { Redirect } from 'react-router-dom';

const GetPlan = gql`
  query GetPlan {
    me {
      group {
        plan {
          id
          days {
            ${Day.fragments.day}
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

      const plan = pathOr(null, ['me', 'group', 'plan'], data);

      if (!plan) {
        return <Redirect to="/plan/edit" />;
      }

      return (
        <div>{plan.days.map((day, idx) => <Day day={day} key={idx} />)}</div>
      );
    }}
  </Query>
);
