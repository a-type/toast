import React from 'react';
import { Gate } from 'features/auth/gates';
import { Link } from 'components/text';
import { Button } from '@material-ui/core';

export default ({ authorId, recipeId, displayType }) => {
  return (
    <Gate
      condition={({ user, token }) =>
        (user && user.uid === authorId) || token.claims['admin']
      }
    >
      <Link to={`${recipeId}/edit`}>
        <Button>Edit</Button>
      </Link>
    </Gate>
  );
};
