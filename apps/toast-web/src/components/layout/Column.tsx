import React, { SFC } from 'react';
import { Box } from 'grommet';

export const Column = ({ children }) => (
  <Box
    direction="column"
    width="100%"
    pad="large"
    style={{ overflowY: 'auto' }}
  >
    <Box
      margin={{ horizontal: 'auto', top: 'large', bottom: '120px' }}
      width="100%"
      style={{ maxWidth: '900px' }}
    >
      {children}
    </Box>
  </Box>
);

export default Column;
