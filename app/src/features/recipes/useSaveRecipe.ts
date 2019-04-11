import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

const SaveRecipeRecipeFragment = gql`
  fragment SaveRecipeRecipe on Recipe {
    id
    title
    saved {
      collection
    }
  }
`;

const SaveRecipeMutation = gql`
  mutation SaveRecipe($input: RecipeSaveInput!) {
    saveRecipe(input: $input) {
      ...SaveRecipeRecipe
    }
  }

  ${SaveRecipeRecipeFragment}
`;

const UnsaveRecipeMutation = gql`
  mutation UnsaveRecipe($input: RecipeSaveInput!) {
    unsaveRecipe(input: $input) {
      ...SaveRecipeRecipe
    }
  }

  ${SaveRecipeRecipeFragment}
`;

type SaveRecipeRecipe = {
  id: string;
  title: string;
  saved?: {
    collection: string;
  }[];
};

type SaveRecipeMutationResult = {
  saveRecipe: SaveRecipeRecipe;
};

type UnsaveRecipeMutationResult = {
  unsaveRecipe: SaveRecipeRecipe;
};

export default ({ refetchQueries }: { refetchQueries?: any[] } = {}) => {
  const mutateSave = useMutation<SaveRecipeMutationResult>(SaveRecipeMutation);
  const mutateUnsave = useMutation<UnsaveRecipeMutationResult>(
    UnsaveRecipeMutation,
  );

  const save = useCallback(
    (input: { recipeId: string }) =>
      mutateSave({
        variables: { input },
        update: (cache, { data }) => {
          // apollo cache adds a typename to the id
          const id = `Recipe:${data.saveRecipe.id}`;
          const saved = data.saveRecipe.saved;
          const current = cache.readFragment<SaveRecipeRecipe>({
            id,
            fragment: SaveRecipeRecipeFragment,
          });
          if (current) {
            current.saved = saved;
            cache.writeFragment({
              fragment: SaveRecipeRecipeFragment,
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
          const id = `Recipe:${data.unsaveRecipe.id}`;
          const saved = data.unsaveRecipe.saved;
          const current = cache.readFragment<SaveRecipeRecipe>({
            id,
            fragment: SaveRecipeRecipeFragment,
          });
          if (current) {
            current.saved = saved;
            cache.writeFragment({
              fragment: SaveRecipeRecipeFragment,
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
