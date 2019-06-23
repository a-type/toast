import React from 'react';
import { Box } from '@material-ui/core';

export const Fullscreen = ({ children }) => (
  <Box
    flexDirection="column"
    justifyContent="start"
    alignItems="stretch"
    width="100%"
    height="100%"
  >
    {children}
  </Box>
);

export default Fullscreen;
