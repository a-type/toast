import React from 'react';
import { Consumer } from '../TokenContext';

export default ({ children }) => (
  <Consumer>{token => token && children}</Consumer>
);
