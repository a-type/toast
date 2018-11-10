import * as React from 'react';
import { Inner, Outer } from './components';

export default React.forwardRef(({ children, ...rest }, ref) => (
  <Outer animated={false} ref={ref as any} {...rest}>
    <Inner>{children}</Inner>
  </Outer>
));
