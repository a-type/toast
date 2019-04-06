import React, { FC } from 'react';
import { Text, Box, Heading } from 'grommet';
import RecipeCards from '../RecipeCards';
import useRecipeCollection from '../useRecipeCollection';
import { Loader } from 'components/generic';

export const RecipeCollection: FC<{}> = ({}) => {
  const [collections, loading, error] = useRecipeCollection();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Sorry, we couldn't load your recipes</Text>;
  }

  return (
    <Box>
      <Heading level="2">Liked</Heading>
      <RecipeCards recipes={collections.likedRecipes} />
      <Heading level="2">Discovered</Heading>
      <RecipeCards recipes={collections.discoveredRecipes} />
      <Heading level="2">Authored</Heading>
      <RecipeCards recipes={collections.authoredRecipes} />
      <Heading level="2">Drafts</Heading>
      <RecipeCards recipes={collections.draftRecipes} />
    </Box>
  );
};
