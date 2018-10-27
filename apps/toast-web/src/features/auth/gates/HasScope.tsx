import * as React from 'react';
import { Consumer } from '../TokenContext';

interface HasScopeProps {
  scope: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const HasScope: React.SFC<HasScopeProps> = ({
  scope,
  children,
  fallback = null,
}) => (
  <Consumer>
    {token => (token && token.scopes.includes(scope) ? children : fallback)}
  </Consumer>
);

export default HasScope;
