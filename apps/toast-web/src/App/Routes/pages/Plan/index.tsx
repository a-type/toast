import React from 'react';
import { TwoColumn, SingleColumn, Content } from 'components/layouts';
import { Edit } from 'features/schedule';
import { Calendar, Setup } from 'features/plan';
import { Switch, Route } from 'react-router-dom';
import { path } from 'ramda';
import { parse, startOfDay } from 'date-fns';
import { Navigation } from 'features/structure';

export default () => (
  <Switch>
    <Route
      path="/plan/edit"
      render={props => (
        <SingleColumn>
          <Navigation />
          <Content mode="overlay">
            <Edit {...props} />
          </Content>
        </SingleColumn>
      )}
    />
    <Route
      path="/plan/setup"
      render={() => (
        <SingleColumn>
          <Navigation />
          <Content mode="overlay">
            <Setup />
          </Content>
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
            <Navigation />
            <Calendar date={date} />
          </TwoColumn>
        );
      }}
    />
  </Switch>
);
