import React, { FC } from 'react';
import Ingredients from './Ingredients';
import Details from './Details/Details';
import { pathOr, path } from 'ramda';
import { Redirect } from 'react-router-dom';
import ViewSpy from './ViewSpy';
import { Spotlight } from 'features/recipes/components/Spotlight';
import { StepsLink } from './components';
import { Heading } from 'grommet';
import { useAuth } from 'contexts/AuthContext';
import ErrorMessage from 'components/generic/ErrorMessage';
import useFullRecipe from '../useFullRecipe';

export interface RecipeViewProps {
  recipeId: string;
}

export const RecipeView: FC<RecipeViewProps> = ({ recipeId }) => {
  const { user } = useAuth();
  const [recipe, loading, error] = useFullRecipe(recipeId);

  if (!loading && recipe && !recipe.published) {
    if (pathOr('none', ['author', 'id'], recipe) === path(['id'], user)) {
      return <Redirect to={`/recipes/edit/${recipeId}`} />;
    }
    return <Redirect to="/" />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <React.Fragment>
      <Spotlight recipe={recipe} />
      <Details recipe={recipe} />
      <Heading level="2">Ingredients</Heading>
      <Ingredients
        servings={path(['servings'], recipe)}
        ingredients={pathOr([], ['ingredients'], recipe)}
      />
      <StepsLink recipeId={recipeId} />
      <ViewSpy recipeId={recipeId} />
    </React.Fragment>
  );
};

export default RecipeView;
