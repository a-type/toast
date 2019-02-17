import React from 'react';
import { IsAdmin } from 'features/auth/gates';
import { Recent, BulkCreate, Create } from 'features/ingredients/manage';
import { Manage as Corrections } from 'features/recipeIngredientCorrections';
import { Layout } from 'components/layout';
import { Heading } from 'grommet';

export default class ManagePage extends React.Component {
  render() {
    return (
      <Layout>
        <IsAdmin>
          <Heading level="2">Recent Ingredients</Heading>
          <Recent />
          <Heading level="2">Bulk Upload Ingredients</Heading>
          <BulkCreate />
          <Heading level="2">Create Ingredient</Heading>
          <Create />
          <Heading level="2">Corrections</Heading>
          <Corrections />
        </IsAdmin>
      </Layout>
    );
  }
}
