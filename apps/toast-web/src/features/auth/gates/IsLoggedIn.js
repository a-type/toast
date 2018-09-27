import React from 'react';
import { Consumer } from '../TokenContext';

export default ({ children, fallback }) => (
  <Consumer>{state => (state.isLoggedIn ? children : fallback)}</Consumer>
);
