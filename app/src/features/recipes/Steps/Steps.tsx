import * as React from 'react';
import LinkFrame from './LinkFrame';
import StepList from './StepList';
import Toolbar from './Toolbar';
import { GlobalLoader } from 'components/generic/Loader/GlobalLoader';
import { pathOr } from 'ramda';
import ErrorMessage from 'components/generic/ErrorMessage';
import useFullRecipe from '../useFullRecipe';
import { Box } from '@material-ui/core';

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
    <Box height="100%" display="flex" flexDirection="column">
      <Box flexGrow={1} display="flex">
        {!!recipe.sourceUrl ? (
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
