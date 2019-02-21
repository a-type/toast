import React, { SFC } from 'react';
import { Box, Grid } from 'grommet';

export const Column = ({ children }) => (
  <Box
    direction="column"
    justify="start"
    align="center"
    width="100%"
    pad="large"
    style={{ overflowY: 'auto' }}
  >
    <Box
      margin={{ horizontal: 'auto', top: 'large', bottom: '120px' }}
      width="100%"
      style={{ maxWidth: '900px', flexShrink: 0 }}
    >
      {children}
    </Box>
  </Box>
);

export default Column;
