import * as React from 'react';
import Correct from 'features/recipes/Correct';
import Column from 'components/layout/Column';

export default ({ match: { params } }) => (
  <Column>
    <Correct recipeId={params.recipeId} />
  </Column>
);
