import React, { FC } from 'react';
import { useCollections, Collection } from 'hooks/features/useCollections';
import ErrorMessage from 'components/ErrorMessage';
import { Loader } from 'components/Loader/Loader';
import { Card, CardHeader, CardActionArea } from '@material-ui/core';
import CardGrid, { CardGridProps } from 'components/CardGrid';

export interface RecipeCollectionsProps extends CardGridProps {
  onCollectionSelected?(collection: Collection): void;
}

export const RecipeCollections: FC<RecipeCollectionsProps> = ({
  onCollectionSelected,
  ...rest
}) => {
  const [collections, loading, error] = useCollections();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <CardGrid {...rest}>
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
