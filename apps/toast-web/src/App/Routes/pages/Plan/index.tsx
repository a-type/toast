import React from 'react';
import { SingleColumn } from 'components/layouts';
import { Edit } from 'features/schedule';
import { Calendar, LandingPage } from 'features/plan';
import { Switch, Route, Redirect } from 'react-router-dom';
import { path } from 'ramda';
import { IsLoggedIn } from 'features/auth/gates';
import { parse, startOfDay } from 'date-fns';

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
        path="/plan/:date?"
        render={({ match }) => {
          const dateParam = path<string>(['params', 'date'], match);

          const date = dateParam ? parse(dateParam) : startOfDay(Date.now());
          return (
            <IsLoggedIn fallback={<LandingPage />}>
              <Calendar date={date} />
            </IsLoggedIn>
          );
        }}
      />
    </Switch>
  </SingleColumn>
);
