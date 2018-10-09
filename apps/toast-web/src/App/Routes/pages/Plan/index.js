import React from 'react';
import { Content, SingleColumn } from 'components/layouts';
import { Edit, View } from 'features/plan';
import { Switch, Route, Redirect } from 'react-router-dom';

export default () => (
  <SingleColumn>
    <Content>
      <Switch>
        <Route path="/plan/edit" component={Edit} />
        <Route path="/plan" component={View} />
      </Switch>
    </Content>
  </SingleColumn>
);
