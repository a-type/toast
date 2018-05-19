import React from 'react';
import Login from 'components/auth/Login';
import Layout from 'components/generic/layouts/SingleCenterContent';
import H1 from 'components/generic/H1';

export default () => (
  <Layout>
    <div>
      <H1>Log in</H1>
      <Login />
    </div>
  </Layout>
);
