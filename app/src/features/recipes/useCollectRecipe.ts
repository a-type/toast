import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const CollectRecipeRecipeFragment = gql`
  fragment CollectRecipeRecipe on Recipe {
    id
    title
    containedInViewerCollections {
      id
    }
  }
`;

const CollectRecipeMutation = gql`
  mutation CollectRecipe($input: RecipeCollectInput!) {
    collectRecipe(input: $input) {
      ...CollectRecipeRecipe
    }
  }

  ${CollectRecipeRecipeFragment}
`;

const UnsaveRecipeMutation = gql`
  mutation UnsaveRecipe($input: RecipeCollectInput!) {
    uncollectRecipe(input: $input) {
      ...CollectRecipeRecipe
    }
  }

  ${CollectRecipeRecipeFragment}
`;

type CollectRecipeRecipe = {
  id: string;
  title: string;
  saved?: {
    collection: string;
  }[];
};

type CollectRecipeMutationResult = {
  collectRecipe: CollectRecipeRecipe;
};

type UnsaveRecipeMutationResult = {
  uncollectRecipe: CollectRecipeRecipe;
};

export default ({ refetchQueries }: { refetchQueries?: any[] } = {}) => {
  const mutateSave = useMutation<CollectRecipeMutationResult>(
    CollectRecipeMutation,
  );
  const mutateUnsave = useMutation<UnsaveRecipeMutationResult>(
    UnsaveRecipeMutation,
  );

  const save = useCallback(
    (input: { recipeId: string; collectionId: string }) =>
      mutateSave({
        variables: { input },
        update: (cache, { data }) => {
          // apollo cache adds a typename to the id
          const id = `Recipe:${data.collectRecipe.id}`;
          const saved = data.collectRecipe.saved;
          const current = cache.readFragment<CollectRecipeRecipe>({
            id,
            fragment: CollectRecipeRecipeFragment,
          });
          if (current) {
            current.saved = saved;
            cache.writeFragment({
              fragment: CollectRecipeRecipeFragment,
              id: current.id,
              data: current,
            });
          } else {
            console.warn(
              `Tried to update saved status of nonexistent recipe ${id}`,
            );
          }
        },
        refetchQueries,
      }),
    [mutateSave],
  );

  const unsave = useCallback(
    (input: { recipeId: string }) =>
      mutateUnsave({
        variables: { input },
        update: (cache, { data }) => {
          const id = `Recipe:${data.uncollectRecipe.id}`;
          const saved = data.uncollectRecipe.saved;
          const current = cache.readFragment<CollectRecipeRecipe>({
            id,
            fragment: CollectRecipeRecipeFragment,
          });
          if (current) {
            current.saved = saved;
            cache.writeFragment({
              fragment: CollectRecipeRecipeFragment,
              id,
              data: current,
            });
          } else {
            console.warn(
              `Tried to update saved status of nonexistent recipe ${id}`,
            );
          }
        },
        refetchQueries,
      }),
    [mutateUnsave],
  );

  return {
    save,
    unsave,
  };
};
