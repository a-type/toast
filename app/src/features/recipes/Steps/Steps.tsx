import * as React from 'react';
import FullRecipeQuery from 'features/recipes/queries/FullRecipeQuery';
import LinkFrame from './LinkFrame';
import StepList from './StepList';
import Toolbar from './Toolbar';
import { GlobalLoader } from 'components/generic/Loader/GlobalLoader';
import { pathOr } from 'ramda';
import { Recipe } from 'generated/schema';
import { Box } from 'grommet';
import ErrorMessage from 'components/generic/ErrorMessage';

export interface StepsProps {
  recipeId: string;
}

const Steps: React.SFC<StepsProps> = ({ recipeId }) => {
  return (
    <FullRecipeQuery variables={{ recipeId }}>
      {({ data, loading, error }) => {
        if (loading) {
          return <GlobalLoader />;
        }

        const recipe = pathOr<Recipe>(null, ['recipe'], data) as Recipe;
        if (error || !recipe) {
          return <ErrorMessage error={error} />;
        }

        return (
          <Box height="100%">
            <Box flex="grow">
              {recipe.displayType === 'LINK' ? (
                <LinkFrame src={recipe.sourceUrl} />
              ) : (
                <StepList steps={pathOr([], ['steps'], recipe)} />
              )}
            </Box>
            <Toolbar recipe={recipe} />
          </Box>
        );
      }}
    </FullRecipeQuery>
  );
};

export default Steps;
