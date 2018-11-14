import React from 'react';
import { SingleColumn } from 'components/layouts';
import { Edit } from 'features/schedule';
import { Calendar, LandingPage } from 'features/plan';
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
  <SingleColumn wide>
    <Switch>
      <Route
        path="/plan/edit"
        render={props => (
          <IsLoggedIn fallback={<Redirect to="/plan" />}>
            <Edit {...props} />
          </IsLoggedIn>
        )}
      />
      <Route
        path="/plan/:weekIndex?/:dayIndex?"
        render={({ match }) => (
          <IsLoggedIn fallback={<LandingPage />}>
            <Calendar
              weekIndex={parseIntOrNil(path(['params', 'weekIndex'], match))}
              dayIndex={parseIntOrNil(path(['params', 'dayIndex'], match))}
            />
          </IsLoggedIn>
        )}
      />
    </Switch>
  </SingleColumn>
);
