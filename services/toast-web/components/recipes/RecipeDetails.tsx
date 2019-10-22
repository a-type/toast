import React, { FC } from 'react';
import { RecipeServings } from './RecipeServings';
import { RecipeTimeSummary } from './RecipeTimeSummary';
import Link from 'components/Link';
import { Box, Typography, Link as TextLink } from '@material-ui/core';

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
        Source:{' '}
        <TextLink component={Link} to={sourceUrl}>
          {sourceUrl}
        </TextLink>
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
