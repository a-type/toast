import * as React from 'react';
import { IsLoggedIn } from 'features/auth/gates';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <IsLoggedIn fallback={<Route {...rest} />} />
);

export default PrivateRoute;
