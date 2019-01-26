import React from 'react';
import { Merge, Edit } from 'features/ingredients/manage';
import { IsAdmin } from 'features/auth/gates';
import { H2 } from 'components/typeset';

export default ({ ingredient }) => (
  <IsAdmin>
    <H2>Manage</H2>
    <IsAdmin>
      <Merge ingredientId={ingredient.id} />
    </IsAdmin>
    <IsAdmin>
      <Edit ingredient={ingredient} />
    </IsAdmin>
  </IsAdmin>
);
