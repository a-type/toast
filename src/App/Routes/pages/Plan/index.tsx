import React from 'react';
import { Edit } from 'features/schedule';
import { Setup } from 'features/plan';
import { Switch, Route } from 'react-router-dom';
import CalendarPage from './CalendarPage';
import Column from 'components/layout/Column';

export default () => (
  <Switch>
    <Route
      path="/plan/edit"
      render={props => (
        <Column>
          <Edit {...props} />
        </Column>
      )}
    />
    <Route
      path="/plan/setup"
      render={() => (
        <Column>
          <Setup />
        </Column>
      )}
    />
    <Route
      path="/plan"
      render={() => {
        return <CalendarPage />;
      }}
    />
  </Switch>
);
