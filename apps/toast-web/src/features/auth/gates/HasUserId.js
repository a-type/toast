import { Consumer } from '../TokenContext';
import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ userId, redirectTo }) => (
  <Consumer>
    {token => token && token.user.id !== userId && <Redirect to={redirectTo} />}
  </Consumer>
);
