import { Consumer } from '../TokenContext';
import React from 'react';

export default ({ scope, children, fallback = null }) => (
  <Consumer>
    {token => (token && token.scopes.includes(scope) ? children : fallback)}
  </Consumer>
);
