import { Consumer } from '../TokenContext';
import React from 'react';

export default ({ scope, children }) => (
  <Consumer>
    {token => token && token.scopes.includes(scope) && children}
  </Consumer>
);
