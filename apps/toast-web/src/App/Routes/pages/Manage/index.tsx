import React from 'react';
import { HasScope } from 'features/auth/gates';
import { Recent, BulkCreate, Create } from 'features/ingredients/manage';
import { Layout } from 'components/layout';
import { H2 } from 'components/typeset';

export default class ManagePage extends React.Component {
  render() {
    return (
      <Layout>
        <HasScope scope="ui:manage">
          <H2>Recent Ingredients</H2>
          <Recent />
          <H2>Bulk Upload Ingredients</H2>
          <BulkCreate />
          <H2>Create Ingredient</H2>
          <Create />
        </HasScope>
      </Layout>
    );
  }
}
