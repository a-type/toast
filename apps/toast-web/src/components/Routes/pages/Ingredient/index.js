// @flow

import React from 'react';
import Layout from 'components/generic/layouts/CenterColumnPage';
import Summary from 'components/ingredients/Summary';

export default ({ match: { params } }) => (
  <Layout>
    <Summary ingredientName={params.ingredientName} />
  </Layout>
);
