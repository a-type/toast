import React from 'react';
import { TwoColumn, SingleColumn } from 'components/layouts';
import { Edit } from 'features/schedule';
import { Calendar, Setup } from 'features/plan';
import { Switch, Route } from 'react-router-dom';
import { path } from 'ramda';
import { parse, startOfDay } from 'date-fns';

export default () => (
  <Switch>
    <Route
      path="/plan/edit"
      render={props => (
        <SingleColumn>
          <Edit {...props} />
        </SingleColumn>
      )}
    />
    <Route
      path="/plan/setup"
      render={() => (
        <SingleColumn>
          <Setup />
        </SingleColumn>
      )}
    />
    <Route
      path="/plan/:date?"
      render={({ match }) => {
        const dateParam = path<string>(['params', 'date'], match);

        const date = dateParam ? parse(dateParam) : startOfDay(Date.now());
        return (
          <TwoColumn tabNames={['Day', 'Week']}>
            <Calendar date={date} />
          </TwoColumn>
        );
      }}
    />
  </Switch>
);
