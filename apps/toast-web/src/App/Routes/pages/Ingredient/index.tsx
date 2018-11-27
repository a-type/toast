import React from 'react';
import { Layout } from 'components/layout';
import Details from 'features/ingredients/Details';

export default ({ match: { params } }) => (
  <Layout>
    <Details ingredientId={params.ingredientId} />
  </Layout>
);
