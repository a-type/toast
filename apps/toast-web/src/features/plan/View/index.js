import React from 'react';
import DayView from './DayView';
import { Query } from 'react-apollo';
import gql from 'fraql';
import { IsLoggedIn } from 'features/auth/gates';
import { pathOr } from 'ramda';

const GetWeekIndex = gql`
  query GetWeekIndex($year: Int!, $month: Int!, $date: Int!) {
    planWeekIndex(year: $year, month: $month, date: $date)
  }
`;

const GetPlan = gql`
  query GetPlan($weekIndex: Int!) {
    me {
      group {
        plan {
          id
          week(weekIndex: $weekIndex) {
            id
            days {
              ${DayView.fragments.day}
            }
          }
        }
      }
    }
  }
`;

const WeekView = ({ weekIndex }) => (
  <Query query={GetPlan} variables={{ weekIndex }}>
    {({ data, loading, error }) => {
      if (loading || error) {
        return null;
      }

      return (
        <DayView
          day={pathOr(null, ['me', 'group', 'plan', 'week', 'days', 0], data)}
        />
      );
    }}
  </Query>
);

const AutoWeekSelectorView = ({ weekIndex }) => {
  if (weekIndex) return <WeekView weekIndex={weekIndex} />;

  const today = new Date();

  return (
    <Query
      query={GetWeekIndex}
      variables={{
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate(),
      }}
    >
      {({ data, loading, error }) => {
        if (loading || error) {
          return <div>TODO</div>;
        }

        return <WeekView weekIndex={data.planWeekIndex} />;
      }}
    </Query>
  );
};

export default props => (
  <IsLoggedIn fallback={<div>Log in</div>}>
    <AutoWeekSelectorView {...props} />
  </IsLoggedIn>
);
