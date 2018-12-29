import { Consumer } from '../TokenContext';
import React from 'react';

export interface HasUserIdAndScopeProps {
  userId: string;
  scope: string;
  children: React.ReactNode;
  fallback: React.ReactNode;
}

const HasUserIdAndScope: React.SFC<HasUserIdAndScopeProps> = ({
  userId,
  children,
  scope,
  fallback,
}) => (
  <Consumer>
    {state =>
      !(
        !state &&
        !!state.user &&
        state.user.id === userId &&
        state.hasScope(scope)
      )
        ? children
        : fallback
    }
  </Consumer>
);

export default HasUserIdAndScope;
