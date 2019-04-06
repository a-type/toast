import * as React from 'react';
import Login from 'features/auth/Login';
import { IsLoggedIn } from 'features/auth/gates';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { parse } from 'query-string';
import Column from 'components/layout/Column';
import { Logo } from 'components/brand';

const LoginPage: React.SFC<RouteComponentProps> = ({ location }) => {
  const returnTo = (parse(location.search).r as string) || '/';
  return (
    <IsLoggedIn
      fallback={
        <Column>
          <Logo
            pattern
            style={{ margin: 'auto auto var(--spacing-lg) auto' }}
            size="10vw"
          />
          <Login returnTo={returnTo} />
        </Column>
      }
    >
      <Redirect to="/" />
    </IsLoggedIn>
  );
};

export default LoginPage;
