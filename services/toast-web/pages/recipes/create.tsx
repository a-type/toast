import React from 'react';
import { Container } from '@material-ui/core';
import RecipeEditor from 'components/recipes/RecipeEditor';
import { NextPage } from 'next';
import { ensureLoggedIn } from 'lib/auth';

// TODO: move recipe editor into this page file

const CreateRecipePage: NextPage = () => (
  <Container>
    <RecipeEditor recipeId={null} />
  </Container>
);

CreateRecipePage.getInitialProps = async ctx => {
  await ensureLoggedIn(ctx);
  return {};
};

export default CreateRecipePage;
