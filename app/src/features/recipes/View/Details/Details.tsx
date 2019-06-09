import React from 'react';
import Servings from './Servings';
import gql from 'graphql-tag';
import Time from './Time';
import Link from 'components/generic/Link';
import TextLink from 'components/text/Link';
import { Box, Typography, Button } from '@material-ui/core';

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return null;
  }

  const { servings, cookTime, prepTime, unattendedTime, sourceUrl } = recipe;

  return (
    <Box mb={3}>
      <Typography variant="h5" gutterBottom>
        Details
      </Typography>
      <Typography gutterBottom>
        Source: <TextLink to={sourceUrl}>{sourceUrl}</TextLink>
      </Typography>
      <Servings servings={servings || 'Not specified'} />
      <Time
        cookTime={cookTime}
        prepTime={prepTime}
        unattendedTime={unattendedTime}
      />
      <Link to={`/recipes/${recipe.id}/correct`}>
        <Button>Suggest correction</Button>
      </Link>
    </Box>
  );
};

RecipeDetails.fragments = {
  Recipe: gql`
    fragment RecipeDetails on Recipe {
      id
      title
      description
      attribution
      sourceUrl
      servings
      cookTime
      prepTime
      unattendedTime
    }
  `,
};

export default RecipeDetails;
