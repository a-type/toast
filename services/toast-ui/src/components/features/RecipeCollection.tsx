import React, { FC } from 'react';
import useCollection, {
  RecipeCollectionRecipe,
} from 'hooks/features/useCollection';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader/Loader';
import { path } from 'ramda';
import { Typography } from '@material-ui/core';
import CardGrid from 'components/generic/CardGrid';
import RecipeCard from './RecipeCard';

export interface RecipeCollectionProps {
  collectionId: string;
  onRecipeSelected?(recipe: any): void;
}

export const RecipeCollection: FC<RecipeCollectionProps> = ({
  collectionId,
  onRecipeSelected,
}) => {
  const { data, loading, error } = useCollection(collectionId);

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
    <>
      {!!(recipes && recipes.length) ? (
        <CardGrid>
          {recipes.map(recipe => (
            <RecipeCard
              recipe={recipe}
              onClick={() => onRecipeSelected(recipe)}
            />
          ))}
        </CardGrid>
      ) : (
        <Typography variant="caption">
          This collection doesn't have any recipes in it
        </Typography>
      )}
    </>
  );
};

export default RecipeCollection;
