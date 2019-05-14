import React from 'react';
import Recipe from 'features/recipes/View';
import Steps from 'features/recipes/Steps';
import { Route, Switch } from 'react-router-dom';
import Correct from './Correct';
import Column from 'components/layout/Column';
import Fullscreen from 'components/layout/Fullscreen';
import RecipeEditor from 'features/recipes/RecipeEditor/RecipeEditor';
import RecipeCollection from '../RecipeCollection';
import PrivateRoute from '../../PrivateRoute';

const RecipePage = ({ match: { params } }) => (
  <Column>
    <Recipe recipeId={params.recipeId} />
  </Column>
);

const RecipeStepsPage = ({ match: { params } }) => (
  <Fullscreen>
    <Steps recipeId={params.recipeId} />
  </Fullscreen>
);

const EditRecipePage = ({ match: { params } }) => (
  <Column>
    <RecipeEditor recipeId={params.recipeId || null} />
  </Column>
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
    <PrivateRoute path="/recipes" exact component={RecipeCollection} />
  </Switch>
);
