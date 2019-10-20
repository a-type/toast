import React from 'react';
import { Container } from '@material-ui/core';
import RecipeEditor from 'components/recipes/RecipeEditor';

// TODO: move recipe editor into this page file

const CreateRecipePage = () => (
  <Container>
    <RecipeEditor recipeId={null} />
  </Container>
);

export default CreateRecipePage;
