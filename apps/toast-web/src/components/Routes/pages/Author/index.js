import React from 'react';
import Layout from 'components/generic/layouts/CenterColumnPage';
import Summary from 'components/authors/Summary';

export default ({ match: { params } }) => (
  <Layout>
    <Summary authorId={params.authorId} />
  </Layout>
);
