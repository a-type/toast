import React from 'react';
import { Container } from '@material-ui/core';
import RecipeEditor from 'components/features/recipes/RecipeEditor';

export const EditRecipePage = ({ match: { params } }) => (
  <Container>
    <RecipeEditor recipeId={params.recipeId || null} />
  </Container>
);
