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
  PublishRecipeMutation,
  RecipeUpdateInput,
  RecipeCreateInput,
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

  const saveMutate = useMutation<{
    id?: string;
    input: RecipeUpdateInput | RecipeCreateInput;
  }>(SaveMutation);

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
            input: {
              title: values.title,
              description: values.description,
              servings: values.servings,
              cookTime: values.cookTime,
              prepTime: values.prepTime,
              unattendedTime: values.unattendedTime,
              private: values.private,
            },
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

  const publishMutate = useMutation(PublishRecipeMutation);
  const publish = useCallback(
    () =>
      publishMutate({
        variables: {
          recipeId,
        },
      }),
    [publishMutate],
  );

  return {
    recipe: (data && data.recipe) || null,
    saving,
    initializing: loading,
    error: error || saveError,
    save,
    createIngredient,
    refetchRecipe: refetch,
    publish,
  };
};
