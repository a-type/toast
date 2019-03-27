import * as React from 'react';
import FullRecipeQuery from '../queries/FullRecipeQuery';
import { Loader, Disconnected, Link } from 'components/generic';
import { Button } from 'grommet';
import logger from 'logger';
import { Spotlight } from 'features/recipes/components';
import IngredientCorrections from './Ingredients';
import { pathOr } from 'ramda';
import { Heading } from 'grommet';

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
          logger.fatal(error);
          return <Disconnected />;
        }

        return (
          <div>
            <Heading level="2">Suggest Recipe Corrections</Heading>
            <Spotlight recipe={data.recipe} />
            <Heading level="3">Ingredients</Heading>
            <IngredientCorrections
              recipeIngredients={pathOr([], ['recipe', 'ingredients'], data)}
            />
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
