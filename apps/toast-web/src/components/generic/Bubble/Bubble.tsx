import React, { forwardRef, ReactNode } from 'react';
import { Inner, Outer } from './components';
import { BackdropArt } from 'components/brand';

export default forwardRef<any, { children?: ReactNode }>(
  ({ children, ...rest }, ref) => (
    <Outer ref={ref as any} {...rest}>
      <BackdropArt />
      <Inner>{children}</Inner>
    </Outer>
  ),
);
