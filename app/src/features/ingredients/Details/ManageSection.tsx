import React from 'react';
import { Merge, Edit } from 'features/ingredients/manage';
import { IsAdmin } from 'features/auth/gates';
import { Heading } from 'components/text';

export default ({ ingredient }) => (
  <IsAdmin>
    <Heading level="2">Manage</Heading>
    <IsAdmin>
      <Merge ingredientId={ingredient.id} />
    </IsAdmin>
    <IsAdmin>
      <Edit ingredient={ingredient} />
    </IsAdmin>
  </IsAdmin>
);
