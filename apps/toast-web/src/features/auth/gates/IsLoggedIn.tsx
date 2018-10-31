import * as React from 'react';
import { Consumer } from '../TokenContext';

interface IsLoggedInProps {
  fallback?: React.ReactNode;
}

const IsLoggedIn: React.SFC<IsLoggedInProps> = ({
  children,
  fallback = null,
}) => (
  <Consumer>
    {state => {
      return state.isLoggedIn ? children : fallback;
    }}
  </Consumer>
);

export default IsLoggedIn;
