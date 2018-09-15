import React from 'react';
import { Consumer } from '../TokenContext';

export default ({ children }) => (
  <Consumer>{state => state.isLoggedIn && children}</Consumer>
);
