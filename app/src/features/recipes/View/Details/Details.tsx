import React from 'react';
import Servings from './Servings';
import gql from 'graphql-tag';
import Time from './Time';
import { Link } from 'components/text';
import { Heading, Box, Text, Button } from 'grommet';

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return null;
  }

  const { servings, cookTime, prepTime, unattendedTime, sourceUrl } = recipe;

  return (
    <Box margin={{ bottom: 'large' }}>
      <Heading level="5">Details</Heading>
      <Text>
        Source: <Link to={sourceUrl}>{sourceUrl}</Link>
      </Text>
      <Servings servings={servings} />
      <Time
        cookTime={cookTime}
        prepTime={prepTime}
        unattendedTime={unattendedTime}
      />
      <Link to={`/recipes/${recipe.id}/correct`}>
        <Button label="Suggest Correction" />
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
