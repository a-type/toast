import * as React from 'react';
import { SingleColumn, Content } from 'components/layouts';
import { View } from 'features/shoppingList';
import { Navigation } from 'features/structure';

export default () => (
  <SingleColumn>
    <Navigation />
    <Content>
      <View />
    </Content>
  </SingleColumn>
);
