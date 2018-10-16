import React from 'react';
import { DayView, NextDayLink, PreviousDayLink, Links } from './components';
import { Query } from 'react-apollo';
import { pathOr } from 'ramda';
import gql from 'fraql';

const GetPlan = gql`
query GetPlan($weekIndex: Int!) {
  me {
    group {
      plan {
        id
        startDate
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

const WeekView = ({ weekIndex, dayIndex }) => (
  <React.Fragment>
    <Query query={GetPlan} variables={{ weekIndex }}>
      {({ data, loading, error }) => {
        if (loading || error) {
          return <DayView.Skeleton />;
        }

        return (
          <DayView
            day={pathOr(
              null,
              ['me', 'group', 'plan', 'week', 'days', dayIndex],
              data,
            )}
          />
        );
      }}
    </Query>
    <Links>
      <PreviousDayLink weekIndex={weekIndex} dayIndex={dayIndex} />
      <NextDayLink weekIndex={weekIndex} dayIndex={dayIndex} />
    </Links>
  </React.Fragment>
);

WeekView.Skeleton = ({ weekIndex, dayIndex }) => (
  <React.Fragment>
    <DayView.Skeleton />
    <Links>
      <PreviousDayLink weekIndex={weekIndex} dayIndex={dayIndex} />
      <NextDayLink weekIndex={weekIndex} dayIndex={dayIndex} />
    </Links>
  </React.Fragment>
);

export default WeekView;
