import * as React from 'react';
import Correct from 'features/recipes/Correct';
import { Container } from '@material-ui/core';

export default ({ match: { params } }) => (
  <Container>
    <Correct recipeId={params.recipeId} />
  </Container>
);
