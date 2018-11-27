import React from 'react';
import { Layout } from 'components/layout';
import { Summary } from 'features/users';

export default ({ match: { params } }) => (
  <Layout>
    <Summary userId={params.userId} />
  </Layout>
);
