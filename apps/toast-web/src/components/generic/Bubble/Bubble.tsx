import * as React from 'react';
import { Inner, Outer } from './components';
import { BackdropArt } from 'components/brand';

export default React.forwardRef(({ children, ...rest }, ref) => (
  <Outer ref={ref as any} {...rest}>
    <BackdropArt />
    <Inner>{children}</Inner>
  </Outer>
));
