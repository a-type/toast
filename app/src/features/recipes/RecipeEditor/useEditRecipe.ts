import { useQuery, useMutation } from 'react-apollo-hooks';
import { useCallback, useState } from 'react';
import { ApolloError } from 'apollo-boost';
import useRouter from 'use-react-router';
import {
  CreateRecipeMutation,
  UpdateRecipeMutation,
  EditRecipeRecipe,
  GetRecipeQuery,
  CreateRecipeIngredientMutation,
  EditRecipeCreateIngredientInput,
} from './queries';

export default ({ recipeId }: { recipeId?: string }) => {
  const isCreate = !recipeId;
  const SaveMutation = isCreate ? CreateRecipeMutation : UpdateRecipeMutation;

  const { data, loading, error, refetch } = useQuery<{
    recipe: EditRecipeRecipe;
  }>(GetRecipeQuery, {
    variables: { id: recipeId },
    skip: isCreate,
  });

  const saveMutate = useMutation(SaveMutation);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<ApolloError>(null);
  const { history } = useRouter();
  const save = useCallback(
    async ({ id, published, ...values }: EditRecipeRecipe) => {
      setSaving(true);
      try {
        const result = await saveMutate({
          variables: {
            id: recipeId,
            input: values,
          },
        });
        if (result.data.createRecipe) {
          history.push(`/recipes/${result.data.createRecipe.id}/edit`);
        }
      } catch (err) {
        setSaveError(err);
      } finally {
        setSaving(false);
      }
    },
    [saveMutate],
  );

  const createIngredientMutate = useMutation(CreateRecipeIngredientMutation);
  const createIngredient = useCallback(
    async ({ ingredientText }: EditRecipeCreateIngredientInput) => {
      setSaving(true);
      try {
        await createIngredientMutate({
          variables: {
            recipeId,
            ingredientText,
          },
          update: async (cache, { data }) => {
            const { recipe } = cache.readQuery<{ recipe: EditRecipeRecipe }>({
              query: GetRecipeQuery,
              variables: { id: recipeId },
            });
            recipe.ingredients.push(data.createRecipeIngredient);
            cache.writeQuery({ query: GetRecipeQuery, data: { recipe } });
          },
        });
      } catch (err) {
        setSaveError(err);
      } finally {
        setSaving(false);
      }
    },
    [createIngredientMutate],
  );

  return {
    recipe: (data && data.recipe) || null,
    saving,
    initializing: loading,
    error: error || saveError,
    save,
    createIngredient,
    refetchRecipe: refetch,
  };
};
