import React from 'react';
import { Box } from './components';

export default props => {
  const isBig = Math.random() > 0.7;
  const isWide = !isBig && Math.random() > 0.8;

  return (
    <Box {...props} className={isBig ? 'large' : isWide ? 'wide' : 'normal'} />
  );
};
