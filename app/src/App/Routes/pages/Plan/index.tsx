import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Column from 'components/layout/Column';
import PlanView from 'features/plan/PlanView/PlanView';
import PageWithActions, {
  Actions,
  PageContent,
} from 'components/layout/PageWithActions';
import Action from 'components/generic/Action';

const PlanPage = () => (
  <PageWithActions pageTitle="Plan">
    <Actions>
      <Action to="/shoppingList" icon="shopping_cart">
        Shopping list
      </Action>
    </Actions>
    <PageContent>
      <PlanView />
    </PageContent>
  </PageWithActions>
);

export default () => (
  <Switch>
    <Route path="/plan" component={PlanPage} />
  </Switch>
);
