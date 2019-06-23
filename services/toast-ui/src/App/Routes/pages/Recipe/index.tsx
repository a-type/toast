import React from 'react';
import Recipe from 'features/recipes/View';
import Steps from 'features/recipes/Steps';
import { Route, Switch } from 'react-router-dom';
import Fullscreen from 'components/layout/Fullscreen';
import RecipeEditor from 'features/recipes/RecipeEditor/RecipeEditor';
import { Container } from '@material-ui/core';

const RecipePage = ({ match: { params } }) => (
  <Container>
    <Recipe recipeId={params.recipeId} />
  </Container>
);

const RecipeStepsPage = ({ match: { params } }) => (
  <Fullscreen>
    <Steps recipeId={params.recipeId} />
  </Fullscreen>
);

const EditRecipePage = ({ match: { params } }) => (
  <Container>
    <RecipeEditor recipeId={params.recipeId || null} />
  </Container>
);

export default () => (
  <Switch>
    <Route
      path={['/recipes/create', '/recipes/:recipeId/edit'] as any}
      component={EditRecipePage}
    />
    <Route path="/recipes/:recipeId/steps" component={RecipeStepsPage} />
    <Route path="/recipes/:recipeId" component={RecipePage} />
  </Switch>
);
