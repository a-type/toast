import React, { FC } from 'react';
import { Text, Box, Heading } from 'grommet';
import RecipeCards from '../RecipeCards';
import useSavedRecipes from '../useSavedRecipes';
import ErrorMessage from 'components/generic/ErrorMessage';
import { GlobalLoader } from 'components/generic/Loader';

export const RecipeCollection: FC<{}> = ({}) => {
  const [saved, loading, error] = useSavedRecipes();

  if (loading) {
    return <GlobalLoader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const drafts = saved.filter(recipe => !recipe.recipe.published);
  const published = saved.filter(recipe => recipe.recipe.published);

  return (
    <Box>
      <Heading level="2">Saved Recipes</Heading>
      <RecipeCards recipes={published.map(saved => saved.recipe)} />
      {drafts.length && (
        <>
          <Heading level="2">Your draft recipes</Heading>
          <RecipeCards recipes={drafts.map(draft => draft.recipe)} />
        </>
      )}
    </Box>
  );
};
