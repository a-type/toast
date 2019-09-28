import React, { FC } from 'react';
import useCollection, {
  RecipeCollectionRecipe,
} from 'hooks/features/useCollection';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader/Loader';
import { path } from 'ramda';
import { Typography } from '@material-ui/core';
import { RecipeGrid, RecipeGridProps } from './recipes/RecipeGrid';

export interface RecipeCollectionProps extends RecipeGridProps {
  collectionId: string;
  onRecipeSelected?(recipe: RecipeCollectionRecipe): void;
}

export const RecipeCollection: FC<
  Omit<
    RecipeCollectionProps,
    'recipes' | 'hasNextPage' | 'fetchMore' | 'emptyState'
  >
> = ({ collectionId, onRecipeSelected, ...rest }) => {
  const { data, loading, error, fetchMore, hasNextPage } = useCollection(
    collectionId,
  );

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  const collection = data.viewer.group.recipeCollection;

  if (!collection) {
    return <ErrorMessage error="This collection doesn't exist" />;
  }

  const recipes = (path(
    ['recipesConnection', 'edges'],
    collection,
  ) as any[]).map(({ node }) => node) as RecipeCollectionRecipe[];

  return (
    <RecipeGrid
      recipes={recipes}
      hasNextPage={hasNextPage}
      fetchMore={fetchMore}
      onRecipeSelected={onRecipeSelected}
      emptyState={
        <Typography variant="caption">
          This collection doesn't have any recipes in it
        </Typography>
      }
    />
  );
};

export default RecipeCollection;
