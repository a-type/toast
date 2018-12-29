import React from 'react';
import { Gate } from 'features/auth/gates';
import { Button } from 'components/generic';
import { Link } from 'components/typeset';

export default ({ authorId, recipeId, displayType }) => {
  const scopeType = displayType === 'FULL' ? 'fullRecipe' : 'linkedRecipe';

  return (
    <Gate
      condition={({ user, hasScope }) =>
        (user && user.id === authorId && hasScope(`update:${scopeType}`)) ||
        hasScope(`update:any:${scopeType}`)
      }
    >
      <Link to={`${recipeId}/edit`}>
        <Button>Edit</Button>
      </Link>
    </Gate>
  );
};
