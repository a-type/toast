import React from 'react';
import { HasUserIdAndScope } from 'features/auth/gates';
import { Button } from 'components/generic';
import { Link } from 'components/typeset';

export default ({ authorId, recipeId }) => (
  <HasUserIdAndScope userId={authorId} scope="edit:fullRecipe">
    <Link to={`${recipeId}/edit`}>
      <Button>Edit</Button>
    </Link>
  </HasUserIdAndScope>
);
