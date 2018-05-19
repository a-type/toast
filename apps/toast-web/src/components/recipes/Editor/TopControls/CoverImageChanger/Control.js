// @flow
import React from 'react';
import { Pill, Icon } from 'components/generic';

export default ({ loading }: { loading: boolean }) => (
  <Pill.Ghost loading={loading}>
    <Icon name="image" />
    <span style={{ fontSize: '12px' }}> Select image</span>
  </Pill.Ghost>
);
