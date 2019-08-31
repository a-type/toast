import React, { FC } from 'react';
import Recipe from 'components/features/recipes/recipeView/RecipeView';
import { RecipeSteps } from 'components/features/recipes/RecipeSteps';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import Fullscreen from 'components/layout/Fullscreen';
import RecipeEditor from 'components/features/recipes/RecipeEditor';
import { Container } from '@material-ui/core';
import { parse } from 'query-string';

const RecipeViewPage: FC<RouteComponentProps<{ recipeId: string }>> = ({
  match: { params },
  location,
}) => {
  const { servings } = parse(location.search.replace('?', ''));
  const servingsValue = servings ? parseInt(servings as string, 10) : undefined;

  return (
    <Container>
      <Recipe recipeId={params.recipeId} servings={servingsValue} />
    </Container>
  );
};

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
