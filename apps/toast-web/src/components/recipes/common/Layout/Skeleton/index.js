// @flow
import React from 'react';
import FieldLayout from './FieldLayout';
import { Input } from 'components/generic';
import Details from '../Content/Details';

export default () => (
  <Details>
    <FieldLayout>
      <Input.H1 loading disabled />
      <Input.Block loading disabled />
    </FieldLayout>
  </Details>
);
