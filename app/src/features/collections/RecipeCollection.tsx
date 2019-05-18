import React, { FC } from 'react';
import useCollection from './useCollection';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic';
import { Box } from 'grommet';
import { Heading, HelpText } from 'components/text';
import { RecipeCards } from 'features/recipes';

export interface RecipeCollectionProps {
  collectionId: string;
  onRecipeSelected?(recipe: any): void;
}

export const RecipeCollection: FC<RecipeCollectionProps> = ({
  collectionId,
  onRecipeSelected,
}) => {
  const [collection, loading, error] = useCollection(collectionId);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!collection) {
    return <ErrorMessage error="This collection doesn't exist" />;
  }

  return (
    <Box>
      <Heading level="2">{collection.name}</Heading>
      {!!collection.recipes.length ? (
        <RecipeCards
          recipes={collection.recipes}
          onRecipeSelected={onRecipeSelected}
        />
      ) : (
        <HelpText>This collection doesn't have any recipes in it</HelpText>
      )}
    </Box>
  );
};

export default RecipeCollection;
