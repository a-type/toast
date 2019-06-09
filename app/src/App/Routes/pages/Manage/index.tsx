import React from 'react';
import { IsAdmin } from 'features/auth/gates';
import { Manage as Corrections } from 'features/recipeIngredientCorrections';
import { Typography, Container } from '@material-ui/core';

export default class ManagePage extends React.Component {
  render() {
    return (
      <Container>
        <IsAdmin>
          <Typography variant="h2">Corrections</Typography>
          <Corrections />
        </IsAdmin>
      </Container>
    );
  }
}
