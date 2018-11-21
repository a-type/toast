import React from 'react';
import { Gate } from 'features/auth/gates';
import { Button } from 'components/generic';
import { Link } from 'components/typeset';

export default ({ authorId, recipeId, displayType }) => {
  const scopeType = displayType === 'FULL' ? 'fullRecipe' : 'linkedRecipe';

  return (
    <Gate
      condition={({ user, scopes }) =>
        (user && user.id === authorId && scopes.includes(`update:${scopeType}`)) ||
        scopes.includes(`update:any:${scopeType}`)
      }
    >
      <Link to={`${recipeId}/edit`}>
        <Button>Edit</Button>
      </Link>
    </Gate>
  );
};
