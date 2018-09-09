import React from 'react';
import Recipe from 'features/recipes/View';
import { SingleColumn } from 'components/layouts';

export default ({ match: { params } }) => (
  <SingleColumn>
    <Recipe recipeId={params.recipeId} />
  </SingleColumn>
);
