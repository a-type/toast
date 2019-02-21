import React, { ReactNode, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Text, TextProps } from 'grommet';

const HelpText = styled(Text)`
  color: inherit;
  opacity: 0.9;
`;

export default (props: TextProps & HTMLAttributes<HTMLSpanElement>) => (
  <HelpText size="small" {...props as any} />
);
