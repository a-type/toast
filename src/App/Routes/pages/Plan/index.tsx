import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Column from 'components/layout/Column';
import PlanView from 'features/plan/PlanView/PlanView';

const PlanPage = () => (
  <Column>
    <PlanView />
  </Column>
);

export default () => (
  <Switch>
    <Route path="/plan" component={PlanPage} />
  </Switch>
);
