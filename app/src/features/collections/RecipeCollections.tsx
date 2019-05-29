import React, { FC } from 'react';
import useCollections from './useCollections';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader, Link, CardGrid } from 'components/generic';
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
    <CardGrid>
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
          css={{
            borderRadius: 'var(--border-radius-lg)',
            '&:focus': {
              boxShadow: '0 0 0 4px var(--color-gray)',
            },
          }}
        >
          <div
            css={{
              display: 'flex',
              borderRadius: 'var(--border-radius-lg)',
              background: 'var(--color-gray-lightest)',
              padding: 'var(--spacing-lg)',
              width: '100%',
              height: '100%',
              fontFamily: 'var(--font-fancy)',
              textAlign: 'center',
              fontWeight: 'var(--bold)',
              fontSize: 'var(--font-size-lg)',
            }}
          >
            <span
              css={{ margin: 'auto' }}
              id={`collection-label-${collection.id}`}
            >
              {collection.name}
            </span>
          </div>
        </Link>
      ))}
    </CardGrid>
  );
};

export default RecipeCollections;
