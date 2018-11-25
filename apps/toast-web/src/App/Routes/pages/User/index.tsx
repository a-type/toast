import React from 'react';
import { SingleColumn, Content } from 'components/layouts';
import { Summary } from 'features/users';
import { Navigation } from 'features/structure';

export default ({ match: { params } }) => (
  <SingleColumn>
    <Navigation />
    <Content>
      <Summary userId={params.userId} />
    </Content>
  </SingleColumn>
);
