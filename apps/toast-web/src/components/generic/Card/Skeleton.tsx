import React from 'react';
import Box from './Box';
import { CardShape } from './types';

export type Props = {
  shape?: CardShape;
};

export default ({ shape, ...rest }: Props) => {
  const isBig = Math.random() > 0.7;
  const isWide = !isBig && Math.random() > 0.8;

  return (
    <Box
      className={shape ? shape : isBig ? 'large' : isWide ? 'wide' : 'normal'}
      {...rest}
    />
  );
};
