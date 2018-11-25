import React from 'react';
import { SingleColumn, Content } from 'components/layouts';
import Details from 'features/ingredients/Details';
import { Navigation } from 'features/structure';

export default ({ match: { params } }) => (
  <SingleColumn>
    <Navigation />
    <Content>
      <Details ingredientId={params.ingredientId} />
    </Content>
  </SingleColumn>
);
