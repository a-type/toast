import * as React from 'react';
import { IsLoggedIn } from 'features/auth/gates';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <IsLoggedIn fallback={<Redirect to="/" />}>
        <Component {...props} />
      </IsLoggedIn>
    )}
  />
);

export default PrivateRoute;
