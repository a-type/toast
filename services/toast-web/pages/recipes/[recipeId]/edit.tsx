import React from 'react';
import { Container } from '@material-ui/core';
import RecipeEditor from 'components/recipes/RecipeEditor';
import { ensureLoggedIn } from 'lib/auth';
import { NextPage } from 'next';

// TODO: move recipe editor into this page file

const EditRecipePage: NextPage<{ recipeId?: string }> = ({ recipeId }) => (
  <Container>
    <RecipeEditor recipeId={recipeId || null} />
  </Container>
);

EditRecipePage.getInitialProps = async ctx => {
  ensureLoggedIn(ctx);
  return ctx.query;
};

export default EditRecipePage;
