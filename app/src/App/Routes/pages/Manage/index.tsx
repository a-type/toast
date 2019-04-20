import React from 'react';
import { IsAdmin } from 'features/auth/gates';
import { Recent, BulkCreate, Create } from 'features/ingredients/manage';
import { Manage as Corrections } from 'features/recipeIngredientCorrections';
import { Heading } from 'grommet';
import Column from 'components/layout/Column';

export default class ManagePage extends React.Component {
  render() {
    return (
      <Column>
        <IsAdmin>
          <Heading level="2">Corrections</Heading>
          <Corrections />
          <Heading level="2">Recent Ingredients</Heading>
          <Recent />
          <Heading level="2">Bulk Upload Ingredients</Heading>
          <BulkCreate />
          <Heading level="2">Create Ingredient</Heading>
          <Create />
        </IsAdmin>
      </Column>
    );
  }
}
