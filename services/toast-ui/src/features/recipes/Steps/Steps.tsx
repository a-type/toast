import { Box } from '@material-ui/core';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader/Loader';
import { pathOr } from 'ramda';
import * as React from 'react';
import useFullRecipe from '../useFullRecipe';
import LinkFrame from './LinkFrame';
import StepList from './StepList';
import Toolbar from './Toolbar';

export interface StepsProps {
  recipeId: string;
}

const Steps: React.SFC<StepsProps> = ({ recipeId }) => {
  const [recipe, loading, error] = useFullRecipe(recipeId);

  if (loading) {
    return <Loader />;
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
