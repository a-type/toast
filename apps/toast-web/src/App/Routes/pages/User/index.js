import React from 'react';
import { SingleColumn, Content } from 'components/layouts';
import { Summary } from 'features/users';

export default ({ match: { params } }) => (
  <SingleColumn>
    <Summary userId={params.userId} />
  </SingleColumn>
);
