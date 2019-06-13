import * as React from 'react';
import { Spotlight } from 'features/recipes/components/Spotlight';
import IngredientCorrections from './Ingredients';
import { pathOr } from 'ramda';
import ErrorMessage from 'components/generic/ErrorMessage';
import useFullRecipe from '../useFullRecipe';
import { Typography, Button } from '@material-ui/core';
import Link from 'components/generic/Link';
import { Loader } from 'components/generic/Loader/Loader';

export interface CorrectRecipeProps {
  recipeId: string;
}

const CorrectRecipe: React.SFC<CorrectRecipeProps> = ({ recipeId }) => {
  const [recipe, loading, error] = useFullRecipe(recipeId);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const ingredients = pathOr([], ['ingredientsConnection', 'nodes'], recipe);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Suggest Recipe Corrections
      </Typography>
      <Spotlight recipe={recipe} />
      <Typography variant="h3" gutterBottom>
        Ingredients ({ingredients.length})
      </Typography>
      <IngredientCorrections recipeId={recipeId} ingredients={ingredients} />
      <Link to={`/recipes/${recipeId}`}>
        <Button>Done</Button>
      </Link>
    </div>
  );
};

export default CorrectRecipe;
