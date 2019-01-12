import React from 'react';
import Recipe from 'features/recipes/View';
import Steps from 'features/recipes/Steps';
import { Layout } from 'components/layout';
import { Route, Switch } from 'react-router-dom';
import Correct from './Correct';

const RecipePage = ({ match: { params } }) => (
  <Layout>
    <Recipe recipeId={params.recipeId} />
  </Layout>
);

const RecipeStepsPage = ({ match: { params } }) => (
  <Layout noScroll>
    <Steps recipeId={params.recipeId} />
  </Layout>
);

export default () => (
  <Switch>
    <Route path="/recipes/:recipeId/steps" component={RecipeStepsPage} />
    <Route path="/recipes/:recipeId/correct" component={Correct} />
    <Route path="/recipes/:recipeId" component={RecipePage} />
  </Switch>
);
