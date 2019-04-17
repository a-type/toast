import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { IsLoggedIn } from 'features/auth/gates';
import useSaveRecipe from '../useSaveRecipe';
import { useQuery } from 'react-apollo-hooks';
import { Button } from 'grommet';
import { Icon } from 'components/generic';
import { path } from 'ramda';

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

const LikeButton = ({ id }) => {
  const { save, unsave } = useSaveRecipe();
  const { data, loading, error } = useQuery(RecipeSaveButtonQuery, {
    variables: { id },
  });

  const isSaved = !!path(['recipe', 'saved', 'length'], data);

  const onClick = useCallback(() => {
    if (isSaved) {
      unsave({ recipeId: id });
    } else {
      save({ recipeId: id });
    }
  }, [isSaved, save, unsave]);

  if (loading || error || !data) {
    return (
      <IsLoggedIn>
        <Button disabled label="Save" icon={<Icon name="favorite_border" />} />
      </IsLoggedIn>
    );
  }

  return (
    <IsLoggedIn>
      <Button
        icon={<Icon name={isSaved ? 'favorite' : 'favorite_border'} />}
        label={isSaved ? 'Saved' : 'Save'}
        onClick={onClick}
      />
    </IsLoggedIn>
  );
};

export default LikeButton;
