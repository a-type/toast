import React from 'react';
import { DayView, Links, CalendarViewLink } from './components';
import { Query } from 'react-apollo';
import { pathOr } from 'ramda';
import gql from 'fraql';
import { Redirect } from 'react-router-dom';

const GetPlan = gql`
query GetPlan($weekIndex: Int!) {
  me {
    group {
      plan {
        id
        week(weekIndex: $weekIndex) {
          startDate
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
    <CalendarViewLink weekIndex={weekIndex} />
    <Query query={GetPlan} variables={{ weekIndex }}>
      {({ data, loading, error }) => {
        if (loading || error) {
          return <DayView.Skeleton />;
        }

        if (!data) {
          return <Redirect to="/plan/edit" />;
        }

        return (
          <React.Fragment>
            <DayView
              day={pathOr(
                null,
                ['me', 'group', 'plan', 'week', 'days', dayIndex],
                data,
              )}
            />
          </React.Fragment>
        );
      }}
    </Query>
    <Links weekIndex={weekIndex} dayIndex={dayIndex} />
  </React.Fragment>
);

WeekView.Skeleton = ({ weekIndex, dayIndex }) => (
  <React.Fragment>
    <CalendarViewLink weekIndex={weekIndex} />
    <DayView.Skeleton />
    <Links weekIndex={weekIndex} dayIndex={dayIndex} />
  </React.Fragment>
);

export default WeekView;
