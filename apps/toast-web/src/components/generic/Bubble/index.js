import React from 'react';
import { Inner, Outer } from './components';

export default ({ children, innerRef, ...rest }) => (
  <Outer animated={false} innerRef={innerRef} {...rest}>
    <Inner>{children}</Inner>
  </Outer>
);
