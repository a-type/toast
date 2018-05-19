import React from 'react';
import Layout from './Layout';
import Logo from 'components/brand/Logo';
import Link from 'components/generic/Link';

export default () => (
  <Layout>
    <Link.Clear to="/">
      <Logo />
    </Link.Clear>
  </Layout>
);
