import { Consumer } from '../TokenContext';
import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ userId, redirectTo }) => (
  <Consumer>
    {state =>
      state &&
      state.user &&
      state.user.id !== userId && <Redirect to={redirectTo} />
    }
  </Consumer>
);
