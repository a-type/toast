import React from 'react';
import Details from 'features/ingredients/Details';
import Column from 'components/layout/Column';

export default ({ match: { params } }) => (
  <Column>
    <Details ingredientId={params.ingredientId} />
  </Column>
);
