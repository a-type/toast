import React from 'react';
import Recipe from 'features/recipes/View';
import Steps from 'features/recipes/Steps';
import { Route, Switch } from 'react-router-dom';
import Correct from './Correct';
import Column from 'components/layout/Column';

const RecipePage = ({ match: { params } }) => (
  <Column>
    <Recipe recipeId={params.recipeId} />
  </Column>
);

const RecipeStepsPage = ({ match: { params } }) => (
  <Column>
    <Steps recipeId={params.recipeId} />
  </Column>
);

export default () => (
  <Switch>
    <Route path="/recipes/:recipeId/steps" component={RecipeStepsPage} />
    <Route path="/recipes/:recipeId/correct" component={Correct} />
    <Route path="/recipes/:recipeId" component={RecipePage} />
  </Switch>
);
