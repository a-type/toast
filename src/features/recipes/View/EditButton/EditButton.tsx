import React from 'react';
import { Gate } from 'features/auth/gates';
import { Button } from 'grommet';
import { Link } from 'components/text';

export default ({ authorId, recipeId, displayType }) => {
  return (
    <Gate
      condition={({ user, token }) =>
        (user && user.uid === authorId) || token.claims['admin']
      }
    >
      <Link to={`${recipeId}/edit`}>
        <Button label="Edit" />
      </Link>
    </Gate>
  );
};
