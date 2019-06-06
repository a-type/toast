import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import {
  IngredientCorrectedFieldsInput,
  IngredientCorrectorIngredient,
  CorrectionType,
} from './types';

type CorrectIngredientMutationResult = {
  submitIngredientCorrection: {
    id: string;
    status: string;
  };
};

export type IngredientCorrectionSubmitInput = {
  recipeId: string;
  ingredientId?: string;
  correctedFields?: IngredientCorrectedFieldsInput;
  correctedText?: string;
  correctionType: CorrectionType;
};

const CorrectIngredientMutation = gql`
  mutation CorrectIngredient($input: IngredientCorrectionSubmitInput!) {
    submitIngredientCorrection(input: $input) {
      id
      status
      ingredient {
        id
        text
        unit
        unitStart
        unitEnd
        quantity
        quantityStart
        quantityEnd
        food {
          id
          name
        }
        foodStart
        foodEnd
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
    { input: IngredientCorrectionSubmitInput }
  >(CorrectIngredientMutation);

  const submitCorrection = async (input: IngredientCorrectionSubmitInput) => {
    await mutate({ variables: { input } });
    if (refetch) {
      return refetch();
    }
  };

  const submitChange = (
    ingredientId: string,
    correctedFields: IngredientCorrectedFieldsInput,
    correctedText?: string,
  ) =>
    submitCorrection({
      recipeId,
      ingredientId,
      correctedFields,
      correctedText,
      correctionType: CorrectionType.Change,
    });

  const submitAdd = (text: string) =>
    submitCorrection({
      recipeId,
      correctedText: text,
      correctionType: CorrectionType.Add,
    });

  const submitDelete = (ingredientId: string) =>
    submitCorrection({
      recipeId,
      ingredientId,
      correctionType: CorrectionType.Delete,
    });

  return {
    submitCorrection,
    submitChange,
    submitAdd,
    submitDelete,
  };
};
