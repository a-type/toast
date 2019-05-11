import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import {
  RecipeIngredientCorrectedValueInput,
  IngredientCorrectorRecipeIngredient,
  CorrectionType,
} from './types';

type CorrectIngredientMutationResult = {
  submitRecipeIngredientCorrection: {
    id: string;
    status: string;
  };
};

export type RecipeIngredientCorrectionSubmitInput = {
  recipeId: string;
  recipeIngredientId?: string;
  correctedValue?: RecipeIngredientCorrectedValueInput;
  correctionType: CorrectionType;
};

const CorrectIngredientMutation = gql`
  mutation CorrectIngredient($input: RecipeIngredientCorrectionSubmitInput!) {
    submitRecipeIngredientCorrection(input: $input) {
      id
      status
    }
  }
`;

export const useCorrectIngredient = ({ recipeId }: { recipeId: string }) => {
  const mutate = useMutation<
    CorrectIngredientMutationResult,
    { input: RecipeIngredientCorrectionSubmitInput }
  >(CorrectIngredientMutation);

  const submitCorrection = (input: RecipeIngredientCorrectionSubmitInput) =>
    mutate({ variables: { input } });

  const submitChange = (
    recipeIngredientId: string,
    correctedValue: RecipeIngredientCorrectedValueInput,
  ) =>
    mutate({
      variables: {
        input: {
          recipeId,
          recipeIngredientId,
          correctedValue,
          correctionType: CorrectionType.Change,
        },
      },
    });

  const submitAdd = (correctedValue: RecipeIngredientCorrectedValueInput) =>
    mutate({
      variables: {
        input: {
          recipeId,
          correctedValue,
          correctionType: CorrectionType.Add,
        },
      },
    });

  const submitDelete = (recipeIngredientId: string) =>
    mutate({
      variables: {
        input: {
          recipeId,
          recipeIngredientId,
          correctionType: CorrectionType.Delete,
        },
      },
    });

  return {
    submitCorrection,
    submitChange,
    submitAdd,
    submitDelete,
  };
};
