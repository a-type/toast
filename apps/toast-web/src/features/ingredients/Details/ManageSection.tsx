import React from 'react';
import { Merge, Edit } from 'features/ingredients/manage';
import { HasScope } from 'features/auth/gates';
import { H2 } from 'components/typeset';

export default ({ ingredient }) => (
  <HasScope scope="ui:manage">
    <H2>Manage</H2>
    <HasScope scope="update:mergeIngredients">
      <Merge ingredientId={ingredient.id} />
    </HasScope>
    <HasScope scope="update:ingredient">
      <Edit ingredient={ingredient} />
    </HasScope>
  </HasScope>
);
