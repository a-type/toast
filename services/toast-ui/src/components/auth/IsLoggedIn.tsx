import * as React from 'react';
import { TokenConsumer } from 'contexts/TokenContext';

interface IsLoggedInProps {
  fallback?: React.ReactNode;
}

export const IsLoggedIn: React.SFC<IsLoggedInProps> = ({
  children,
  fallback = null,
}) => (
  <TokenConsumer>
    {state => {
      if (state.isLoggedIn === undefined) {
        return null;
      }
      return state.isLoggedIn ? children : fallback;
    }}
  </TokenConsumer>
);
