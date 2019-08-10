import { Box, Typography } from '@material-ui/core';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader/Loader';
import { pathOr } from 'ramda';
import * as React from 'react';
import useFullRecipe from 'hooks/features/useFullRecipe';
import { RecipeSourceFrame } from './RecipeSourceFrame';
import { RecipeStepsToolbar } from './RecipeStepsToolbar';

export interface RecipeStepsProps {
  recipeId: string;
}

export const RecipeSteps: React.SFC<RecipeStepsProps> = ({ recipeId }) => {
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
      <RecipeStepsToolbar recipe={recipe} />
    </Box>
  );
};

const StepList = ({ steps }) => (
  <ol css={{ margin: 'var(--spacing-md)', fontSize: 'var(--font-size-lg)' }}>
    {steps.map((text, index) => (
      <li key={index}>
        <Typography>{text}</Typography>
      </li>
    ))}
  </ol>
);
