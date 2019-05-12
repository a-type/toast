import { useMutation } from 'react-apollo-hooks';
import { useCallback, useState } from 'react';
import { ApolloError } from 'apollo-boost';

import {
  EditRecipeRecipe,
  GetRecipeQuery,
  CreateRecipeStepMutation,
  EditRecipeCreateStepInput,
  EditRecipeUpdateStepInput,
  UpdateRecipeStepMutation,
  DeleteRecipeStepMutation,
} from './queries';

export default ({ recipeId }: { recipeId: string }) => {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<ApolloError>(null);

  const createStepMutate = useMutation(CreateRecipeStepMutation);
  const createStep = useCallback(
    async (input: EditRecipeCreateStepInput) => {
      setSaving(true);
      try {
        await createStepMutate({
          variables: {
            recipeId,
            input,
          },
          update: async (cache, { data }) => {
            const { recipe } = cache.readQuery<{ recipe: EditRecipeRecipe }>({
              query: GetRecipeQuery,
              variables: { id: recipeId },
            });
            recipe.steps.push(data.createRecipeStep);
            cache.writeQuery({ query: GetRecipeQuery, data: { recipe } });
          },
        });
      } catch (err) {
        setSaveError(err);
      } finally {
        setSaving(false);
      }
    },
    [createStepMutate],
  );

  const updateStepMutate = useMutation(UpdateRecipeStepMutation);
  const updateStep = useCallback(
    async (input: EditRecipeUpdateStepInput) => {
      setSaving(true);
      try {
        await updateStepMutate({
          variables: {
            recipeId,
            input,
          },
          update: async (cache, { data }) => {
            const { recipe } = cache.readQuery<{ recipe: EditRecipeRecipe }>({
              query: GetRecipeQuery,
              variables: { id: recipeId },
            });
            const updatedStep = data.updateRecipeStep;
            recipe.steps = recipe.steps.map(step => {
              if (step.id === updatedStep.id) {
                return updatedStep;
              }
              return step;
            });
            cache.writeQuery({ query: GetRecipeQuery, data: { recipe } });
          },
        });
      } catch (err) {
        setSaveError(err);
      } finally {
        setSaving(false);
      }
    },
    [createStepMutate],
  );

  const deleteStepMutate = useMutation(DeleteRecipeStepMutation);
  const deleteStep = useCallback(
    async (recipeStepId: string) => {
      setSaving(true);
      try {
        await deleteStepMutate({
          variables: {
            recipeStepId,
          },
          update: async (cache, { data }) => {
            const { recipe } = cache.readQuery<{ recipe: EditRecipeRecipe }>({
              query: GetRecipeQuery,
              variables: { id: recipeId },
            });
            recipe.steps = recipe.steps.filter(({ id }) => recipeStepId !== id);
            cache.writeQuery({ query: GetRecipeQuery, data: { recipe } });
          },
        });
      } catch (err) {
        setSaveError(err);
      } finally {
        setSaving(false);
      }
    },
    [deleteStepMutate],
  );

  return {
    saving,
    error: saveError,
    createStep,
    updateStep,
    deleteStep,
  };
};
