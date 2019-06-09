import React, { FC } from 'react';
import Ingredients from './Ingredients';
import Details from './Details/Details';
import { pathOr, path } from 'ramda';
import { Redirect } from 'react-router-dom';
import ViewSpy from './ViewSpy';
import { Spotlight } from 'features/recipes/components/Spotlight';
import { StepsLink } from './components';
import { useAuth } from 'contexts/AuthContext';
import ErrorMessage from 'components/generic/ErrorMessage';
import useFullRecipe from '../useFullRecipe';
import { GlobalLoader } from 'components/generic/Loader';
import { Typography } from '@material-ui/core';

export interface RecipeViewProps {
  recipeId: string;
}

export const RecipeView: FC<RecipeViewProps> = ({ recipeId }) => {
  const { user } = useAuth();
  const [recipe, loading, error] = useFullRecipe(recipeId);

  if (loading) {
    return <GlobalLoader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (recipe && !recipe.published) {
    if (pathOr('none', ['author', 'id'], recipe) === path(['uid'], user)) {
      return <Redirect to={`/recipes/${recipeId}/edit`} />;
    }
  }

  return (
    <React.Fragment>
      <Spotlight recipe={recipe} />
      <Details recipe={recipe} />
      <Typography variant="h2" gutterBottom>
        Ingredients
      </Typography>
      <Ingredients
        servings={path(['servings'], recipe)}
        ingredients={pathOr([], ['ingredientsConnection', 'nodes'], recipe)}
      />
      <StepsLink recipeId={recipeId} />
      <ViewSpy recipeId={recipeId} />
    </React.Fragment>
  );
};

export default RecipeView;
