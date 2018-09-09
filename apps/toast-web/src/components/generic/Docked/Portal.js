import React from 'react';
import ReactDOM from 'react-dom';

export default ({ target, children, style }) =>
  ReactDOM.createPortal(<div style={style}>{children}</div>, target);
