import React from 'react';
import Box from './Box';

export default props => {
  const isBig = Math.random() > 0.7;
  const isWide = !isBig && Math.random() > 0.8;

  return (
    <Box
      className={
        props.shape ? props.shape : isBig ? 'large' : isWide ? 'wide' : 'normal'
      }
      {...props}
    />
  );
};
