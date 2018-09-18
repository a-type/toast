import { Consumer } from '../TokenContext';
import React from 'react';
import { Redirect } from 'react-router-dom';

// TODO: admin
export default ({ userId, children }) =>
  null && (
    <Consumer>
      {state => state && state.user && state.user.id === userId && children}
    </Consumer>
  );
