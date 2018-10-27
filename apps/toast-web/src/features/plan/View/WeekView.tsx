import React from 'react';
import { DayView, Links, CalendarViewLink } from './components';
import { pathOr } from 'ramda';
import { Redirect } from 'react-router-dom';
import GetPlanQuery from './GetPlanQuery';

const WeekView = ({ weekIndex, dayIndex }) => (
  <React.Fragment>
    <CalendarViewLink weekIndex={weekIndex} />
    <GetPlanQuery variables={{ weekIndex }}>
      {({ data, loading, error }) => {
        if (loading || error) {
          return <DayView.Skeleton />;
        }

        if (!data || !pathOr(null, ['me', 'group', 'plan'], data)) {
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
    </GetPlanQuery>
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
