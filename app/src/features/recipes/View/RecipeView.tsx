import { Typography } from '@material-ui/core';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader/Loader';
import { useAuth } from 'contexts/AuthContext';
import { Spotlight } from 'features/recipes/components/Spotlight';
import { path, pathOr } from 'ramda';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import useFullRecipe from '../useFullRecipe';
import { StepsLink } from './components';
import Details from './Details/Details';
import Ingredients from './Ingredients';
import ViewSpy from './ViewSpy';

export interface RecipeViewProps {
  recipeId: string;
}

export const RecipeView: FC<RecipeViewProps> = ({ recipeId }) => {
  const { user } = useAuth();
  const [recipe, loading, error] = useFullRecipe(recipeId);

  if (loading) {
    return <Loader />;
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
