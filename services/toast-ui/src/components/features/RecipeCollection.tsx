import React, { FC } from 'react';
import useCollection, {
  RecipeCollectionRecipe,
} from 'hooks/features/useCollection';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader/Loader';
import { path } from 'ramda';
import { Typography, Button } from '@material-ui/core';
import CardGrid, { CardGridProps } from 'components/generic/CardGrid';
import RecipeCard from './RecipeCard';
import useRouter from 'use-react-router';

export interface RecipeCollectionProps extends CardGridProps {
  collectionId: string;
  onRecipeSelected?(recipe: RecipeCollectionRecipe): void;
}

export const RecipeCollection: FC<RecipeCollectionProps> = ({
  collectionId,
  onRecipeSelected,
  ...rest
}) => {
  const { data, loading, error, fetchMore, hasNextPage } = useCollection(
    collectionId,
  );
  const { history } = useRouter();

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

  const handleRecipeSelected = (recipe: RecipeCollectionRecipe) => {
    if (onRecipeSelected) {
      onRecipeSelected(recipe);
    } else {
      history.push(`/recipes/${recipe.id}`);
    }
  };

  return (
    <>
      {!!(recipes && recipes.length) ? (
        <>
          <CardGrid {...rest}>
            {recipes.map(recipe => (
              <RecipeCard
                recipe={recipe}
                onClick={() => handleRecipeSelected(recipe)}
              />
            ))}
          </CardGrid>
          {hasNextPage && (
            <Button fullWidth onClick={fetchMore}>
              Load more
            </Button>
          )}
        </>
      ) : (
        <Typography variant="caption">
          This collection doesn't have any recipes in it
        </Typography>
      )}
    </>
  );
};

export default RecipeCollection;
