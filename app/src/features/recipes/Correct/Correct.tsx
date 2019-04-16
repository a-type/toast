import * as React from 'react';
import FullRecipeQuery from '../queries/FullRecipeQuery';
import { Loader, Link } from 'components/generic';
import { Button } from 'grommet';
import { Spotlight } from 'features/recipes/components';
import IngredientCorrections from './Ingredients';
import { pathOr } from 'ramda';
import { Heading } from 'grommet';
import ErrorMessage from 'components/generic/ErrorMessage';

export interface CorrectRecipeProps {
  recipeId: string;
}

const CorrectRecipe: React.SFC<CorrectRecipeProps> = ({ recipeId }) => {
  return (
    <FullRecipeQuery variables={{ recipeId }}>
      {({ loading, data, error }) => {
        if (loading) {
          return <Loader />;
        }

        if (error) {
          return <ErrorMessage error={error} />;
        }

        const recipeIngredients = pathOr([], ['recipe', 'ingredients'], data);

        return (
          <div>
            <Heading level="2">Suggest Recipe Corrections</Heading>
            <Spotlight recipe={data.recipe} />
            <Heading level="3">
              Ingredients ({recipeIngredients.length})
            </Heading>
            <IngredientCorrections recipeIngredients={recipeIngredients} />
            <Link to={`/recipes/${recipeId}`}>
              <Button label="Done" />
            </Link>
          </div>
        );
      }}
    </FullRecipeQuery>
  );
};

export default CorrectRecipe;
