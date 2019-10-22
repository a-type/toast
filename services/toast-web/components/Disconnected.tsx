import React from 'react';
import { Center } from 'components/layout/Center';
import { Typography } from '@material-ui/core';
import { CloudOffTwoTone } from '@material-ui/icons';

export default () => (
  <Center style={{ opacity: 0.75, color: 'var(--color-gray)' }}>
    <CloudOffTwoTone />
    <Typography>Couldn't reach the server. Refreshing might work.</Typography>
  </Center>
);
