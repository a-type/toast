import React from 'react';
import { Layout, LayoutTypes } from 'components/layout';
import { IsLoggedIn } from 'features/auth/gates';
import AnonLanding from './AnonLanding';
import { Redirect } from 'react-router-dom';

export default () => (
  <IsLoggedIn
    fallback={
      <Layout backgroundStyle={LayoutTypes.BackgroundStyle.Art}>
        <AnonLanding />
      </Layout>
    }
  >
    <Redirect to="/plan" />
  </IsLoggedIn>
);
