import React, { FC } from 'react';
import { Text, Box, Heading } from 'grommet';
import RecipeCards from '../RecipeCards';
import { Loader } from 'components/generic';
import useSavedRecipes from '../useSavedRecipes';
import ErrorMessage from 'components/generic/ErrorMessage';

export const RecipeCollection: FC<{}> = ({}) => {
  const [saved, loading, error] = useSavedRecipes();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Box>
      <Heading level="2">Saved Recipes</Heading>
      <RecipeCards recipes={saved.map(saved => saved.recipe)} />
    </Box>
  );
};
