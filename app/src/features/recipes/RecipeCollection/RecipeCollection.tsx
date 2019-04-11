import React, { FC } from 'react';
import { Text, Box, Heading } from 'grommet';
import RecipeCards from '../RecipeCards';
import { Loader } from 'components/generic';
import useSavedRecipes from '../useSavedRecipes';

export const RecipeCollection: FC<{}> = ({}) => {
  const [saved, loading, error] = useSavedRecipes();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Sorry, we couldn't load your recipes</Text>;
  }

  return (
    <Box>
      <Heading level="2">Saved Recipes</Heading>
      <RecipeCards recipes={saved.map(saved => saved.recipe)} />
    </Box>
  );
};
