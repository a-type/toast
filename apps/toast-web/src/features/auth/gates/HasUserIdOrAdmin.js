import { Consumer } from '../TokenContext';
import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ userId, children }) => (
  <Consumer>
    {token =>
      token &&
      (token.user.id === userId || token.roles.includes('admin')) &&
      children
    }
  </Consumer>
);
