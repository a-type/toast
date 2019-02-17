import React from 'react';
import { Layout, LayoutTypes } from 'components/layout';
import { Edit } from 'features/schedule';
import { Setup } from 'features/plan';
import { Switch, Route } from 'react-router-dom';
import CalendarPage from './CalendarPage';

export default () => (
  <Switch>
    <Route
      path="/plan/edit"
      render={props => (
        <Layout backgroundStyle={LayoutTypes.BackgroundStyle.Brand}>
          <Edit {...props} />
        </Layout>
      )}
    />
    <Route
      path="/plan/setup"
      render={() => (
        <Layout backgroundStyle={LayoutTypes.BackgroundStyle.Art}>
          <Setup />
        </Layout>
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
