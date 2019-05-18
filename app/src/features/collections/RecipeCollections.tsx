import React, { FC } from 'react';
import useCollections from './useCollections';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader, Link } from 'components/generic';
import { Box } from 'grommet';
import { Collection } from './useCollections';

export interface RecipeCollectionsProps {
  onCollectionSelected?(collection: Collection): void;
}

export const RecipeCollections: FC<RecipeCollectionsProps> = ({
  onCollectionSelected,
}) => {
  const [collections, loading, error] = useCollections();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      {collections.map(collection => (
        <Link
          key={collection.id}
          to={
            !onCollectionSelected ? `/collections/${collection.id}` : undefined
          }
          onClick={() => {
            if (onCollectionSelected) {
              onCollectionSelected(collection);
            }
          }}
        >
          {collection.name}
        </Link>
      ))}
    </Box>
  );
};

export default RecipeCollections;
