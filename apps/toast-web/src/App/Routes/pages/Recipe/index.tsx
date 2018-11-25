import React from 'react';
import Recipe from 'features/recipes/View';
import Steps from 'features/recipes/Steps';
import { SingleColumn, Content } from 'components/layouts';
import { Route, Switch } from 'react-router-dom';
import { Navigation } from 'features/structure';

const RecipePage = ({ match: { params } }) => (
  <SingleColumn>
    <Navigation />
    <Content>
      <Recipe recipeId={params.recipeId} />
    </Content>
  </SingleColumn>
);

const RecipeStepsPage = ({ match: { params } }) => (
  <SingleColumn noScroll>
    <Navigation />
    <Content>
      <Steps recipeId={params.recipeId} />
    </Content>
  </SingleColumn>
);

export default () => (
  <Switch>
    <Route path="/recipes/:recipeId/steps" component={RecipeStepsPage} />
    <Route path="/recipes/:recipeId" component={RecipePage} />
  </Switch>
);
