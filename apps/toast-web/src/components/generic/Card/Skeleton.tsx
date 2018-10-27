import React from 'react';
import Box from './Box';
import { CardShape } from './types';

export interface CardSkeletonProps {
  shape?: CardShape;
  style?: React.CSSProperties;
}

export default ({ shape, ...rest }: CardSkeletonProps) => {
  const isBig = Math.random() > 0.7;
  const isWide = !isBig && Math.random() > 0.8;

  return (
    <Box
      className={shape ? shape : isBig ? 'large' : isWide ? 'wide' : 'normal'}
      {...rest}
    />
  );
};
