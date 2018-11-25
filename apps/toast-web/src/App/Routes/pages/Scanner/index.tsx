import React from 'react';
import { SingleColumn, Content } from 'components/layouts';
import Promo from 'features/scanner/Promo';
import { Navigation } from 'features/structure';

export default () => (
  <SingleColumn>
    <Navigation />
    <Content>
      <Promo />
    </Content>
  </SingleColumn>
);
