import React from 'react';
import { Merge } from 'features/ingredients/manage';
import { HasScope } from 'features/auth/gates';
import { H2 } from 'components/typeset';

export default ({ ingredientId }) => (
  <HasScope scope="ui:manage">
    <H2>Manage</H2>
    <HasScope scope="update:mergeIngredients">
      <Merge ingredientId={ingredientId} />
    </HasScope>
  </HasScope>
);
