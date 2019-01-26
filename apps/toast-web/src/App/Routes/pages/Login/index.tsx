import * as React from 'react';
import Login from 'features/auth/Login';
import { Layout, LayoutTypes } from 'components/layout';
import { IsLoggedIn } from 'features/auth/gates';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { parse } from 'query-string';

const LoginPage: React.SFC<RouteComponentProps> = ({ location }) => {
  const returnTo = (parse(location.search).r as string) || '/';
  return (
    <IsLoggedIn
      fallback={
        <Layout backgroundStyle={LayoutTypes.BackgroundStyle.Art}>
          <Login returnTo={returnTo} />
        </Layout>
      }
    >
      <Redirect to="/" />
    </IsLoggedIn>
  );
};

export default LoginPage;
