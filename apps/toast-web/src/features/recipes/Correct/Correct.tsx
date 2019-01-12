import * as React from 'react';
import FullRecipeQuery from '../queries/FullRecipeQuery';
import { Loader, Disconnected } from 'components/generic';
import logger from 'logger';
import { Spotlight } from 'features/recipes/components';
import { H2 } from 'components/typeset';

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
            <H2>Suggest Recipe Corrections</H2>
            <Spotlight recipe={data.recipe} />
          </div>
        );
      }}
    </FullRecipeQuery>
  );
};

export default CorrectRecipe;
