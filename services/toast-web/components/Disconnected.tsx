import React from 'react';
import { Centered, Icon } from 'components/generic';
import { Typography } from '@material-ui/core';

export default () => (
  <Centered style={{ opacity: 0.75, color: 'var(--color-gray)' }}>
    <Icon name="cloud_off" size="90px" inactive />
    <Typography>Couldn't reach the server. Refreshing might work.</Typography>
  </Centered>
);
