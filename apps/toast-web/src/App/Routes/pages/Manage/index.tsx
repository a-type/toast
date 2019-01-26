import React from 'react';
import { IsAdmin } from 'features/auth/gates';
import { Recent, BulkCreate, Create } from 'features/ingredients/manage';
import { Manage as Corrections } from 'features/recipeIngredientCorrections';
import { Layout } from 'components/layout';
import { H2 } from 'components/typeset';

export default class ManagePage extends React.Component {
  render() {
    return (
      <Layout>
        <IsAdmin>
          <H2>Recent Ingredients</H2>
          <Recent />
          <H2>Bulk Upload Ingredients</H2>
          <BulkCreate />
          <H2>Create Ingredient</H2>
          <Create />
          <H2>Corrections</H2>
          <Corrections />
        </IsAdmin>
      </Layout>
    );
  }
}
