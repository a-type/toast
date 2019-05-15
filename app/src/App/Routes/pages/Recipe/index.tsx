import React from 'react';
import Recipe from 'features/recipes/View';
import Steps from 'features/recipes/Steps';
import { Route, Switch } from 'react-router-dom';
import Correct from './Correct';
import Fullscreen from 'components/layout/Fullscreen';
import RecipeEditor from 'features/recipes/RecipeEditor/RecipeEditor';
import PrivateRoute from '../../PrivateRoute';
import PageWithActions, {
  PageContent,
  Actions,
} from 'components/layout/PageWithActions';
import { RecipeCollection } from 'features/recipes/RecipeCollection/RecipeCollection';
import Action from 'components/generic/Action';

const RecipeCollectionPage = () => (
  <PageWithActions pageTitle="Collection">
    <Actions>
      <Action to="/recipes/create" icon="add">
        Add your own recipe
      </Action>
    </Actions>
    <PageContent>
      <RecipeCollection />
    </PageContent>
  </PageWithActions>
);

const RecipePage = ({ match: { params } }) => (
  <PageWithActions>
    <PageContent>
      <Recipe recipeId={params.recipeId} />
    </PageContent>
  </PageWithActions>
);

const RecipeStepsPage = ({ match: { params } }) => (
  <Fullscreen>
    <Steps recipeId={params.recipeId} />
  </Fullscreen>
);

const EditRecipePage = ({ match: { params } }) => (
  <PageWithActions>
    <PageContent>
      <RecipeEditor recipeId={params.recipeId || null} />
    </PageContent>
  </PageWithActions>
);

export default () => (
  <Switch>
    <Route
      path={['/recipes/create', '/recipes/:recipeId/edit'] as any}
      component={EditRecipePage}
    />
    <Route path="/recipes/:recipeId/steps" component={RecipeStepsPage} />
    <Route path="/recipes/:recipeId/correct" component={Correct} />
    <Route path="/recipes/:recipeId" component={RecipePage} />
    <PrivateRoute path="/recipes" exact component={RecipeCollectionPage} />
  </Switch>
);
