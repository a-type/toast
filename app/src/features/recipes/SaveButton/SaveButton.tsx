import React, { useCallback, useState } from 'react';
import gql from 'graphql-tag';
import { IsLoggedIn } from 'features/auth/gates';
import useCollectRecipe from '../useCollectRecipe';
import { useQuery } from 'react-apollo-hooks';
import { Button } from 'grommet';
import { Icon } from 'components/generic';
import { path } from 'ramda';
import Popup from 'components/generic/Popup';
import RecipeCollections from 'features/collections/RecipeCollections';

const RecipeSaveButtonQuery = gql`
  query RecipeSaveButton($id: ID!) {
    recipe(id: $id) {
      id
      containedInViewerCollections {
        id
      }
    }
  }
`;

const LikeButton = ({ id }) => {
  const { save, unsave } = useCollectRecipe({
    refetchQueries: ['RecipeSaveButton'],
  });
  const { data, loading, error } = useQuery(RecipeSaveButtonQuery, {
    variables: { id },
  });
  const [showCollectionModal, setShowCollectionModal] = useState<boolean>(
    false,
  );

  console.log(data);

  const isSaved = !!path(
    ['recipe', 'containedInViewerCollections', 'length'],
    data,
  );

  const onClick = useCallback(() => {
    if (isSaved) {
      unsave({ recipeId: id });
    } else {
      setShowCollectionModal(true);
    }
  }, [isSaved, save, unsave, id]);

  const handleCollectionSelected = useCallback(
    async collection => {
      await save({ recipeId: id, collectionId: collection.id });
      setShowCollectionModal(false);
    },
    [save, id],
  );

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
      {showCollectionModal && (
        <Popup onClose={() => setShowCollectionModal(false)}>
          <RecipeCollections onCollectionSelected={handleCollectionSelected} />
        </Popup>
      )}
    </IsLoggedIn>
  );
};

export default LikeButton;
