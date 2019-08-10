import * as React from 'react';
import { IsLoggedIn } from 'components/auth/IsLoggedIn';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <IsLoggedIn
        fallback={
          <Redirect
            to={`/login?r=${encodeURIComponent(window.location.pathname)}`}
          />
        }
      >
        <Component {...props} />
      </IsLoggedIn>
    )}
  />
);
