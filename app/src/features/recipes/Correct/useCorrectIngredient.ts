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
      recipeIngredient {
        id
        text
        unit
        unitStart
        unitEnd
        quantity
        quantityStart
        quantityEnd
        ingredient {
          id
          name
        }
        ingredientStart
        ingredientEnd
        comments
        preparations
      }
    }
  }
`;

export const useCorrectIngredient = ({
  recipeId,
  refetch,
}: {
  recipeId: string;
  refetch?: () => any;
}) => {
  const mutate = useMutation<
    CorrectIngredientMutationResult,
    { input: RecipeIngredientCorrectionSubmitInput }
  >(CorrectIngredientMutation);

  const submitCorrection = async (
    input: RecipeIngredientCorrectionSubmitInput,
  ) => {
    await mutate({ variables: { input } });
    if (refetch) {
      return refetch();
    }
  };

  const submitChange = (
    recipeIngredientId: string,
    correctedValue: RecipeIngredientCorrectedValueInput,
  ) =>
    submitCorrection({
      recipeId,
      recipeIngredientId,
      correctedValue,
      correctionType: CorrectionType.Change,
    });

  const submitAdd = (correctedValue: RecipeIngredientCorrectedValueInput) =>
    submitCorrection({
      recipeId,
      correctedValue,
      correctionType: CorrectionType.Add,
    });

  const submitDelete = (recipeIngredientId: string) =>
    submitCorrection({
      recipeId,
      recipeIngredientId,
      correctionType: CorrectionType.Delete,
    });

  return {
    submitCorrection,
    submitChange,
    submitAdd,
    submitDelete,
  };
};
