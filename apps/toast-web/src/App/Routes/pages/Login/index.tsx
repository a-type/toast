import * as React from 'react';
import Login from 'features/auth/Login';
import { RouteComponentProps } from 'react-router-dom';
import { parse } from 'query-string';

const LoginPage: React.SFC<RouteComponentProps> = ({ location }) => {
  const returnTo = parse(location.search).r as string;
  return <Login returnTo={returnTo} />;
};

export default LoginPage;
