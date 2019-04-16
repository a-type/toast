import React, { FC, useState } from 'react';
import IngredientCorrector, {
  IngredientCorrectorRecipeIngredient,
} from './IngredientCorrector';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { RecipeIngredientCorrectedValueInput, CorrectionType } from './types';
import { AddIngredient } from './AddIngredient';
import { Box, Heading } from 'grommet';

interface IngredientCorrectionsProps {
  recipeIngredients: IngredientCorrectorRecipeIngredient[];
}

const CorrectIngredientMutation = gql`
  mutation CorrectIngredient($input: RecipeIngredientCorrectionSubmitInput!) {
    submitRecipeIngredientCorrection(input: $input) {
      id
      status
    }
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

  const [candidates, seemFine] = recipeIngredients.reduce<
    [
      IngredientCorrectorRecipeIngredient[],
      IngredientCorrectorRecipeIngredient[]
    ]
  >(
    ([c, f], recipeIngredient) => {
      if (!recipeIngredient.ingredient || !recipeIngredient.unit) {
        c.push(recipeIngredient);
      } else {
        f.push(recipeIngredient);
      }
      return [c, f];
    },
    [[], []],
  );

  return (
    <Box margin={{ bottom: 'large' }}>
      <Heading level="4">These might need help</Heading>
      {candidates.map(recipeIngredient => (
        <IngredientCorrector
          key={recipeIngredient.id}
          recipeIngredient={recipeIngredient}
          submit={submitCorrection}
          requestDelete={requestDelete}
        />
      ))}
      <AddIngredient submitAdd={submitAdd} />
      <Heading level="4">These seem ok</Heading>
      {seemFine.map(recipeIngredient => (
        <IngredientCorrector
          key={recipeIngredient.id}
          recipeIngredient={recipeIngredient}
          submit={submitCorrection}
          requestDelete={requestDelete}
        />
      ))}
    </Box>
  );
};

export default IngredientCorrections;
