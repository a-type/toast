import { Typography } from '@material-ui/core';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader/Loader';
import { useAuth } from 'contexts/AuthContext';
import { RecipeSpotlight } from 'components/features/recipes/RecipeSpotlight';
import { path, pathOr } from 'ramda';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import useFullRecipe from 'hooks/features/useFullRecipe';
import { RecipeStepsLink } from './StepsLink';
import Details from './Details';
import Ingredients from './Ingredients';

export interface RecipeViewProps {
  recipeId: string;
}

export const RecipeView: FC<RecipeViewProps> = ({ recipeId }) => {
  const { user } = useAuth();
  const { data, loading, error } = useFullRecipe(recipeId);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const recipe = data.recipe;

  if (recipe && !recipe.published) {
    if (pathOr('none', ['author', 'id'], recipe) === path(['uid'], user)) {
      return <Redirect to={`/recipes/${recipeId}/edit`} />;
    }
  }

  return (
    <React.Fragment>
      <RecipeSpotlight recipe={recipe} />
      <Details recipe={recipe} />
      <Typography variant="h3" component="h2" gutterBottom>
        Ingredients
      </Typography>
      <Ingredients
        recipeId={recipeId}
        servings={path(['servings'], recipe)}
        ingredients={pathOr([], ['ingredientsConnection', 'edges'], recipe).map(
          ({ node }) => node,
        )}
      />
      <RecipeStepsLink recipeId={recipeId} />
    </React.Fragment>
  );
};

export default RecipeView;
