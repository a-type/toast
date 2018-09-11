import { Consumer } from '../TokenContext';
import React from 'react';

export default ({ role, children }) => (
  <Consumer>
    {token => token && token.roles.includes(role) && children}
  </Consumer>
);
