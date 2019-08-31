import React, { FC } from 'react';
import Servings from './Servings';
import Time from './Time';
import TextLink from 'components/text/Link';
import { Box, Typography } from '@material-ui/core';

const RecipeDetails: FC<{ recipe: any; servingsOverride?: number }> = ({
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
      <Servings
        servingsOverride={servingsOverride}
        servings={servings || 'Not specified'}
      />
      <Time
        cookTime={cookTime}
        prepTime={prepTime}
        unattendedTime={unattendedTime}
      />
    </Box>
  );
};

export default RecipeDetails;
