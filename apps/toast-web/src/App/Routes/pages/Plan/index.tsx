import React from 'react';
import { SingleColumn } from 'components/layouts';
import { Edit, Calendar, AnonLandingPage } from 'features/plan';
import { Switch, Route, Redirect } from 'react-router-dom';
import { path } from 'ramda';
import { IsLoggedIn } from 'features/auth/gates';

const parseIntOrNil = maybeInt => {
  if (maybeInt !== undefined) {
    return parseInt(maybeInt);
  }
  return maybeInt;
};

export default () => (
  <SingleColumn>
    <IsLoggedIn fallback={<AnonLandingPage />}>
      <Switch>
        <Route path="/plan/edit" component={Edit} />
        <Route
          path="/plan/calendar/:weekIndex?"
          render={({ match }) => (
            <Calendar.WeekView
              weekIndex={parseIntOrNil(path(['params', 'weekIndex'], match))}
            />
          )}
        />
        <Route
          path="/plan/:weekIndex?/:dayIndex?"
          render={({ match }) => (
            <Calendar.DayView
              weekIndex={parseIntOrNil(path(['params', 'weekIndex'], match))}
              dayIndex={parseIntOrNil(path(['params', 'dayIndex'], match))}
            />
          )}
        />
      </Switch>
    </IsLoggedIn>
  </SingleColumn>
);
