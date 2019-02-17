import React from 'react';
import { Summary } from 'features/users';
import Column from 'components/layout/Column';

export default ({ match: { params } }) => (
  <Column>
    <Summary userId={params.userId} />
  </Column>
);
