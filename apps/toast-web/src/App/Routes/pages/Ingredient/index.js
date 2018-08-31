// @flow

import React from 'react';
import { SingleColumn } from 'components/layouts';
import Details from 'features/ingredients/Details';

export default ({ match: { params } }) => (
  <SingleColumn>
    <SingleColumn.Content>
      <Details ingredientId={params.ingredientId} />
    </SingleColumn.Content>
  </SingleColumn>
);
