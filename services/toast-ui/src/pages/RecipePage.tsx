import React from 'react';
import Recipe from 'components/features/recipes/recipeView/RecipeView';
import { RecipeSteps } from 'components/features/recipes/RecipeSteps';
import { Route, Switch } from 'react-router-dom';
import Fullscreen from 'components/layout/Fullscreen';
import RecipeEditor from 'components/features/recipes/RecipeEditor';
import { Container } from '@material-ui/core';

const RecipeViewPage = ({ match: { params } }) => (
  <Container>
    <Recipe recipeId={params.recipeId} />
  </Container>
);

const RecipeStepsPage = ({ match: { params } }) => (
  <Fullscreen>
    <RecipeSteps recipeId={params.recipeId} />
  </Fullscreen>
);

const EditRecipePage = ({ match: { params } }) => (
  <Container>
    <RecipeEditor recipeId={params.recipeId || null} />
  </Container>
);

export const RecipePage = () => (
  <Switch>
    <Route
      path={['/recipes/create', '/recipes/:recipeId/edit'] as any}
      component={EditRecipePage}
    />
    <Route path="/recipes/:recipeId/steps" component={RecipeStepsPage} />
    <Route path="/recipes/:recipeId" component={RecipeViewPage} />
  </Switch>
);
