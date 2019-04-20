import * as React from 'react';
import { Loader, Link } from 'components/generic';
import { Button } from 'grommet';
import { Spotlight } from 'features/recipes/components/Spotlight';
import IngredientCorrections from './Ingredients';
import { pathOr } from 'ramda';
import { Heading } from 'grommet';
import ErrorMessage from 'components/generic/ErrorMessage';
import useFullRecipe from '../useFullRecipe';

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

  const recipeIngredients = pathOr([], ['ingredients'], recipe);

  return (
    <div>
      <Heading level="2">Suggest Recipe Corrections</Heading>
      <Spotlight recipe={recipe} />
      <Heading level="3">Ingredients ({recipeIngredients.length})</Heading>
      <IngredientCorrections recipeIngredients={recipeIngredients} />
      <Link to={`/recipes/${recipeId}`}>
        <Button label="Done" />
      </Link>
    </div>
  );
};

export default CorrectRecipe;
