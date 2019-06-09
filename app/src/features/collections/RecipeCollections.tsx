import React, { FC } from 'react';
import useCollections from './useCollections';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Collection } from './useCollections';
import Link from 'components/generic/Link';
import Loader from 'components/generic/Loader';
import { Card, CardHeader, CardActionArea } from '@material-ui/core';
import CardGrid from 'components/generic/CardGrid';

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
    <CardGrid>
      {collections.map(collection => (
        <Card key={collection.id}>
          <CardActionArea onClick={() => onCollectionSelected(collection)}>
            <CardHeader title={collection.name} />
          </CardActionArea>
        </Card>
      ))}
    </CardGrid>
  );
};

export default RecipeCollections;
