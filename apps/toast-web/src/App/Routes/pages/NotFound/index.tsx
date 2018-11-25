import React from 'react';
import { Content, SingleColumn } from 'components/layouts';
import { Navigation } from 'features/structure';

export default () => (
  <SingleColumn>
    <Navigation />
    <Content>Not found</Content>
  </SingleColumn>
);
