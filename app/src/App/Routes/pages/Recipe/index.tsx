import React from 'react';
import Recipe from 'features/recipes/View';
import Steps from 'features/recipes/Steps';
import { Route, Switch } from 'react-router-dom';
import Correct from './Correct';
import Column from 'components/layout/Column';
import Fullscreen from 'components/layout/Fullscreen';

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

export default () => (
  <Switch>
    <Route path="/recipes/:recipeId/steps" component={RecipeStepsPage} />
    <Route path="/recipes/:recipeId/correct" component={Correct} />
    <Route path="/recipes/:recipeId" component={RecipePage} />
  </Switch>
);
