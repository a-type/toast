import React, { SFC } from 'react';
import { Box, Grid } from 'grommet';
import styled from 'styled-components';

const CenterArea = styled(Box)`
  width: 100%;
  max-width: 100%;
  flex-shrink: 0;

  @media (min-width: 900px) {
    max-width: 900px;
  }
`;

export const Column = ({ children, ...rest }) => (
  <Box
    direction="column"
    justify="start"
    align="center"
    width="100%"
    pad="large"
    style={{ overflowY: 'auto', overflowX: 'hidden' }}
    className="layout-column"
    {...rest}
  >
    <CenterArea margin={{ horizontal: 'auto' }}>{children}</CenterArea>
  </Box>
);

export default Column;
