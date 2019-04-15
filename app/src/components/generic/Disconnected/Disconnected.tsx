import React from 'react';
import { Centered, Icon } from 'components/generic';
import { Paragraph } from 'grommet';

export default () => (
  <Centered style={{ opacity: 0.75, color: 'var(--color-gray)' }}>
    <Icon name="unavailable-cloud" size="90px" />
    <Paragraph>Couldn't reach the server. Refreshing might work.</Paragraph>
  </Centered>
);