import React from 'react';
import { Box } from './components';

export default props => {
  const isBig = Math.random() > 0.7;

  return <Box {...props} className={isBig ? 'large' : 'normal'} />;
};
