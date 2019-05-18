import React from 'react';
import Recipe from 'features/recipes/View';
import Steps from 'features/recipes/Steps';
import { Route, Switch } from 'react-router-dom';
import Correct from './Correct';
import Fullscreen from 'components/layout/Fullscreen';
import RecipeEditor from 'features/recipes/RecipeEditor/RecipeEditor';
import PageWithActions, {
  PageContent,
} from 'components/layout/PageWithActions';

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
  <PageWithActions pageTitle={params.recipeId ? 'Edit recipe' : 'New recipe'}>
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
  </Switch>
);
