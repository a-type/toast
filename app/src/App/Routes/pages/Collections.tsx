import React, { FC } from 'react';
import { RecipeCollections } from 'features/collections/RecipeCollections';
import Action from 'components/generic/Action';
import PageWithActions, {
  PageContent,
  Actions,
} from 'components/layout/PageWithActions';
import RecipeCollection from 'features/collections/RecipeCollection';
import { RouteComponentProps, Switch, Route } from 'react-router';

const RecipeCollectionsPage = () => (
  <PageWithActions pageTitle="Collections">
    <Actions>
      <Action to="/recipes/create" icon="add">
        Add your own recipe
      </Action>
    </Actions>
    <PageContent>
      <RecipeCollections />
    </PageContent>
  </PageWithActions>
);

const RecipeCollectionPage: FC<
  RouteComponentProps<{ collectionId: string }>
> = ({
  match: {
    params: { collectionId },
  },
}) => (
  <PageWithActions pageTitle="Collection" backPath="/collections">
    <Actions>
      <Action to="/recipes/create" icon="add">
        Add your own recipe
      </Action>
    </Actions>
    <PageContent>
      <RecipeCollection collectionId={collectionId} />
    </PageContent>
  </PageWithActions>
);

export default () => (
  <Switch>
    <Route path="/collections" exact component={RecipeCollectionsPage} />
    <Route path="/collections/:collectionId" component={RecipeCollectionPage} />
  </Switch>
);
