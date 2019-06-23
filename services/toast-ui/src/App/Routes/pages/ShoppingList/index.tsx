import * as React from 'react';
import { ShoppingList } from 'features/shoppingList/ShoppingList';
import Column from 'components/layout/Column';
import PageWithActions, {
  PageContent,
  Actions,
} from 'components/layout/PageWithActions';
import Action from 'components/generic/Action';

export default () => (
  <PageWithActions pageTitle="Shopping list">
    <Actions>
      <Action to="/plan" icon="calendar_today">
        Your plan
      </Action>
    </Actions>
    <PageContent>
      <ShoppingList />
    </PageContent>
  </PageWithActions>
);
