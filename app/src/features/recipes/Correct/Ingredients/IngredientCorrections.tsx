import React, { FC } from 'react';
import IngredientCorrector from './IngredientCorrector';
import { IngredientCorrectorRecipeIngredient } from '../types';
import { AddIngredient } from './AddIngredient';
import { Box } from 'grommet';
import { Heading } from 'components/text';
import { useCorrectIngredient } from '../useCorrectIngredient';

interface IngredientCorrectionsProps {
  recipeId: string;
  recipeIngredients: IngredientCorrectorRecipeIngredient[];
}

const IngredientCorrections: FC<IngredientCorrectionsProps> = ({
  recipeIngredients,
  recipeId,
}) => {
  const { submitChange, submitAdd, submitDelete } = useCorrectIngredient({
    recipeId,
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
          submit={submitChange}
          requestDelete={submitDelete}
        />
      ))}
      <AddIngredient submitAdd={submitAdd} />
      <Heading level="4">These seem ok</Heading>
      {seemFine.map(recipeIngredient => (
        <IngredientCorrector
          key={recipeIngredient.id}
          recipeIngredient={recipeIngredient}
          submit={submitChange}
          requestDelete={submitDelete}
        />
      ))}
    </Box>
  );
};

export default IngredientCorrections;
