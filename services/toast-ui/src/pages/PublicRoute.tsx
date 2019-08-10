import * as React from 'react';
import { IsLoggedIn } from 'components/auth/IsLoggedIn';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <IsLoggedIn fallback={<Route {...rest} />} />
);
