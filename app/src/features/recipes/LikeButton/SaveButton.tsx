import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { IsLoggedIn } from 'features/auth/gates';
import useSaveRecipe from '../useSaveRecipe';
import { useQuery } from 'react-apollo-hooks';
import { Button } from 'grommet';
import { Icon } from 'components/generic';

const RecipeSaveButtonQuery = gql`
  query RecipeSaveButton($id: ID!) {
    recipe(id: $id) {
      id
      saved {
        collection
      }
    }
  }
`;

const LikeButton = ({ recipe }) => {
  const { save, unsave } = useSaveRecipe();
  const { data, loading, error } = useQuery(RecipeSaveButtonQuery);

  const isSaved = !!data.recipe.saved.length;

  const onClick = useCallback(() => {
    if (isSaved) {
      unsave({ recipeId: recipe.id });
    } else {
      save({ recipeId: recipe.id });
    }
  }, [isSaved, save, unsave]);

  return (
    <IsLoggedIn>
      <Button
        icon={<Icon name={isSaved ? 'heart' : 'heart-outline'} />}
        label={isSaved ? 'Saved' : 'Save'}
      />
    </IsLoggedIn>
  );
};

export default LikeButton;
