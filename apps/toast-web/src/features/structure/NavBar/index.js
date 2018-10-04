import React from 'react';
import Layout from './Layout';
import Logo from 'components/brand/Logo';
import { Link } from 'components/typeset';
import { Bar as SearchBar } from 'features/search';
import { IsLoggedIn } from 'features/auth/gates';
import LoginButton from './LoginButton';
import UserControls from './UserControls';

export default () => (
  <Layout>
    <Link.Clear to="/">
      <Logo />
    </Link.Clear>
    <SearchBar />
    <IsLoggedIn fallback={<LoginButton />}>
      <UserControls />
    </IsLoggedIn>
  </Layout>
);
