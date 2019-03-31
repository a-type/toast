import React, { FC } from 'react';
import useLikedRecipes, { LikedRecipe } from '../useLikedRecipes';
import { Box } from 'grommet';
import { Loader } from 'components/generic';
import { Label, Link } from 'components/text';
import { RecipeCards } from '..';
import RecipeSummaryEmpty from './Empty';
import { ApolloError } from 'apollo-boost';

interface RecipesSummaryProps {
  likedRecipes: LikedRecipe[];
  loading: boolean;
  error?: ApolloError;
}

export const RecipesSummary: FC<RecipesSummaryProps> = ({
  likedRecipes,
  loading,
  error,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!likedRecipes.length) {
    return <RecipeSummaryEmpty />;
  }

  return (
    <Box margin={{ bottom: 'large' }} align="start">
      <Label>Your liked recipes</Label>
      <RecipeCards recipes={likedRecipes} />
      <Link to="/recipes/collection">Go to recipes</Link>
    </Box>
  );
};

export default RecipesSummary;
