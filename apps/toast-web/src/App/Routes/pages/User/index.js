import React from 'react';
import { SingleColumn } from 'components/layouts';
import { Summary } from 'features/users';

export default ({ match: { params } }) => (
  <SingleColumn>
    <SingleColumn.Content>
      <Summary userId={params.userId} />
    </SingleColumn.Content>
  </SingleColumn>
);
