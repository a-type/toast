import React from 'react';
import { HasUserIdOrAdmin } from 'features/auth/gates';
import { Button } from 'components/generic';
import { Link } from 'components/typeset';

export default ({ authorId, recipeId }) => (
  <HasUserIdOrAdmin userId={authorId}>
    <Link to={`${recipeId}/edit`}>
      <Button>Edit</Button>
    </Link>
  </HasUserIdOrAdmin>
);
