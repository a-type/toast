import React from 'react';
import { Centered, Icon } from 'components/generic';
import { P } from 'components/typeset';

export default () => (
  <Centered style={{ opacity: 0.75, color: 'var(--color-gray)' }}>
    <Icon name="unavailable-cloud" size="90px" />
    <P>Couldn't reach the server. Refreshing might work.</P>
  </Centered>
);
