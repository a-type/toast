import React from 'react';
import { TwoColumn, SingleColumn } from 'components/layouts';
import { Edit } from 'features/schedule';
import { Calendar, LandingPage } from 'features/plan';
import { Switch, Route, Redirect } from 'react-router-dom';
import { path } from 'ramda';
import { IsLoggedIn } from 'features/auth/gates';
import { parse, startOfDay } from 'date-fns';

export default () => (
  <Switch>
    <Route
      path="/plan/edit"
      render={props => (
        <IsLoggedIn fallback={<Redirect to="/plan" />}>
          <SingleColumn>
            <Edit {...props} />
          </SingleColumn>
        </IsLoggedIn>
      )}
    />
    <Route
      path="/plan/:date?"
      render={({ match }) => {
        const dateParam = path<string>(['params', 'date'], match);

        const date = dateParam ? parse(dateParam) : startOfDay(Date.now());
        return (
          <IsLoggedIn
            fallback={
              <SingleColumn>
                <LandingPage />
              </SingleColumn>
            }
          >
            <TwoColumn tabNames={['Day', 'Week']}>
              <Calendar date={date} />
            </TwoColumn>
          </IsLoggedIn>
        );
      }}
    />
  </Switch>
);
