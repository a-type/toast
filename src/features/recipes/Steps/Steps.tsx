import * as React from 'react';
import FullRecipeQuery from 'features/recipes/queries/FullRecipeQuery';
import LinkFrame from './LinkFrame';
import StepList from './StepList';
import Toolbar from './Toolbar';
import GlobalLoader from 'components/generic/Loader/GlobalLoader';
import { Disconnected } from 'components/generic';
import logger from 'logger';
import { pathOr } from 'ramda';
import { Recipe } from 'generated/schema';

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
          logger.fatal(error);
          // TODO: still show link to recipe
          return <Disconnected />;
        }

        return (
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            {recipe.displayType === 'LINK' ? (
              <LinkFrame src={recipe.sourceUrl} />
            ) : (
              <StepList steps={pathOr([], ['steps'], recipe)} />
            )}
            <Toolbar recipe={recipe} />
          </div>
        );
      }}
    </FullRecipeQuery>
  );
};

export default Steps;
