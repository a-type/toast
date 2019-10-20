import React from 'react';
import { Container } from '@material-ui/core';
import RecipeEditor from 'components/recipes/RecipeEditor';

// TODO: move recipe editor into this page file

const EditRecipePage = ({ recipeId }) => (
  <Container>
    <RecipeEditor recipeId={recipeId || null} />
  </Container>
);

EditRecipePage.getInitialProps = ({ query }) => ({ recipeId: query.recipeId });

export default EditRecipePage;
