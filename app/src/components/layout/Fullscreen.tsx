import React from 'react';
import { Box } from 'grommet';

export const Fullscreen = ({ children }) => (
  <Box
    direction="column"
    justify="start"
    align="stretch"
    width="100%"
    height="100%"
  >
    {children}
  </Box>
);

export default Fullscreen;
