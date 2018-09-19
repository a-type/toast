import { Consumer } from '../TokenContext';
import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ userId, children, scope }) =>
  null && (
    <Consumer>
      {state =>
        !!state &&
        !!state.user &&
        state.user.id === userId &&
        state.scopes.includes(scope) &&
        children
      }
    </Consumer>
  );
