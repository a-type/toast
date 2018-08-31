import React from 'react';
import Layout from './Layout';
import Logo from 'components/brand/Logo';
import Link from 'components/generic/Link';
import { Bar as SearchBar } from 'features/search';
import { withRouter } from 'react-router-dom';
import { SelfLink } from 'features/users';

export default withRouter(({ location }) => (
  <Layout>
    <Link.Clear to="/">
      <Logo />
    </Link.Clear>
    <SearchBar />
    <SelfLink />
  </Layout>
));
