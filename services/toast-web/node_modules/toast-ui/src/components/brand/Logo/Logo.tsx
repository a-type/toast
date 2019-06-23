import React, { SFC, HTMLAttributes } from 'react';
import Text from './Text';
import Wrapper from './Wrapper';
import BackdropArt from '../BackdropArt';

const Logo: SFC<
  { pattern?: boolean; size?: string } & HTMLAttributes<HTMLDivElement>
> = ({ pattern = true, size = '80px', ...rest }) => (
  <Wrapper {...rest} size={size}>
    {pattern && <BackdropArt />}
    <Text>Toast</Text>
  </Wrapper>
);

export default Logo;
