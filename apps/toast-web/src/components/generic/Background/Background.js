import React from 'react';
import { createPortal } from 'react-dom';
import { PORTAL_ID } from './constants';

export default ({ children }) =>
  createPortal(children, document.getElementById(PORTAL_ID));
