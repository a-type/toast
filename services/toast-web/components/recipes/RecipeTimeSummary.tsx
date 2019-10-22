import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { FullRecipe } from 'hooks/features/fragments';

export const RecipeTimeSummary: FC<{ recipe: FullRecipe }> = ({ recipe }) => {
  if (!recipe) {
    return null;
  }

  const { cookTime, prepTime, unattendedTime } = recipe;

  if (!cookTime && !prepTime && !unattendedTime) {
    return null;
  }

  if (cookTime && !prepTime && !unattendedTime) {
    return <Typography gutterBottom>{cookTime} min</Typography>;
  }

  if (cookTime && unattendedTime) {
    return (
      <Typography gutterBottom>
        {unattendedTime} min unattended + {cookTime} min active
      </Typography>
    );
  }

  if (prepTime && cookTime) {
    return (
      <Typography gutterBottom>
        {prepTime} min prep + {cookTime} min cooking
      </Typography>
    );
  }

  return (
    <Typography gutterBottom>
      {prepTime} min prep, {unattendedTime} min unattended, {cookTime} min
      cooking
    </Typography>
  );
};
