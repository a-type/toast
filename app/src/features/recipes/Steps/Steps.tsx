import * as React from 'react';
import LinkFrame from './LinkFrame';
import StepList from './StepList';
import Toolbar from './Toolbar';
import { GlobalLoader } from 'components/generic/Loader/GlobalLoader';
import { pathOr } from 'ramda';
import { Box } from 'grommet';
import ErrorMessage from 'components/generic/ErrorMessage';
import useFullRecipe from '../useFullRecipe';

export interface StepsProps {
  recipeId: string;
}

const Steps: React.SFC<StepsProps> = ({ recipeId }) => {
  const [recipe, loading, error] = useFullRecipe(recipeId);

  if (loading) {
    return <GlobalLoader />;
  }

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
};

export default Steps;
