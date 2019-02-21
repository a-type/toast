import React from 'react';
import { createPortal } from 'react-dom';

export default ({ children }) => {
  const el = document.getElementById('modalLayer');
  if (!el) {
    return null;
  }

  return createPortal(children, el);
};
