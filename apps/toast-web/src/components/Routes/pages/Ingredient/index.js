// @flow

import React from 'react';
import Layout from 'components/generic/layouts/CenterColumnPage';
import Details from 'components/ingredients/Details';

export default ({ match: { params } }) => (
  <Layout>
    <Details ingredientId={params.ingredientId} />
  </Layout>
);
