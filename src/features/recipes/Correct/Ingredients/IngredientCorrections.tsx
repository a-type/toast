import React, { FC, useState } from 'react';
import IngredientCorrector, {
  IngredientCorrectorRecipeIngredient,
} from './IngredientCorrector';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { RecipeIngredientCorrectedValueInput, CorrectionType } from './types';
import { AddIngredient } from './AddIngredient';
import { Box } from 'grommet';

interface IngredientCorrectionsProps {
  recipeIngredients: IngredientCorrectorRecipeIngredient[];
}

const CorrectIngredientMutation = gql`
  mutation CorrectIngredient($input: RecipeIngredientCorrectionSubmitInput!) {
    submitRecipeIngredientCorrection(input: $input)
  }
`;

const IngredientCorrections: FC<IngredientCorrectionsProps> = ({
  recipeIngredients,
}) => {
  const mutate = useMutation(CorrectIngredientMutation);

  const submitCorrection = (
    id: string,
    correction: RecipeIngredientCorrectedValueInput,
  ) =>
    mutate({
      variables: {
        input: {
          recipeIngredientId: id,
          correctedValue: correction,
          correctionType: CorrectionType.Change,
        },
      },
    });

  const submitAdd = (add: RecipeIngredientCorrectedValueInput) =>
    mutate({
      variables: {
        input: {
          correctedValue: add,
          correctionType: CorrectionType.Add,
        },
      },
    });

  const requestDelete = (id: string) =>
    mutate({
      variables: {
        input: {
          recipeIngredientId: id,
          correctionType: CorrectionType.Delete,
        },
      },
    });

  return (
    <Box margin={{ bottom: 'large' }}>
      {recipeIngredients.map(recipeIngredient => (
        <IngredientCorrector
          key={recipeIngredient.id}
          recipeIngredient={recipeIngredient}
          submit={submitCorrection}
          requestDelete={requestDelete}
        />
      ))}
      <AddIngredient submitAdd={submitAdd} />
    </Box>
  );
};

export default IngredientCorrections;
