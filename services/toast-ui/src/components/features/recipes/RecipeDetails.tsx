import React, { FC } from 'react';
import { RecipeServings } from './RecipeServings';
import { RecipeTimeSummary } from './RecipeTimeSummary';
import TextLink from 'components/text/Link';
import { Box, Typography } from '@material-ui/core';

export const RecipeDetails: FC<{ recipe: any; servingsOverride?: number }> = ({
  recipe,
  servingsOverride,
}) => {
  if (!recipe) {
    return null;
  }

  const { servings, cookTime, prepTime, unattendedTime, sourceUrl } = recipe;

  return (
    <Box width="100%">
      <Typography gutterBottom style={{ overflowX: 'hidden' }}>
        Source: <TextLink to={sourceUrl}>{sourceUrl}</TextLink>
      </Typography>
      <RecipeServings
        servingsOverride={servingsOverride}
        servings={servings || 'Not specified'}
      />
      <RecipeTimeSummary recipe={recipe} />
    </Box>
  );
};

export default RecipeDetails;
