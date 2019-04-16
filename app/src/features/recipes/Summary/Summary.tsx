import React, { FC } from 'react';
import { SavedRecipeEdge } from '../useSavedRecipes';
import { Box, Button } from 'grommet';
import { Loader } from 'components/generic';
import { Label } from 'components/text';
import { Link } from 'components/generic';
import { RecipeCards } from '..';
import RecipeSummaryEmpty from './Empty';
import { ApolloError } from 'apollo-boost';
import ErrorMessage from 'components/generic/ErrorMessage';

interface RecipesSummaryProps {
  savedRecipes: SavedRecipeEdge[];
  loading: boolean;
  error?: ApolloError;
}

export const RecipesSummary: FC<RecipesSummaryProps> = ({
  savedRecipes,
  loading,
  error,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!savedRecipes.length) {
    return <RecipeSummaryEmpty />;
  }

  return (
    <Box margin={{ bottom: 'large' }} align="start">
      <Label>Your liked recipes</Label>
      <RecipeCards recipes={savedRecipes.map(liked => liked.recipe)} />
      <Link to="/recipes/collection">
        <Button label="Go to recipes" />
      </Link>
    </Box>
  );
};

export default RecipesSummary;
