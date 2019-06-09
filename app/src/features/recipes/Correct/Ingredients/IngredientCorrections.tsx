import React, { FC } from 'react';
import IngredientCorrector from './IngredientCorrector';
import { IngredientCorrectorIngredient } from '../types';
import { AddIngredient } from './AddIngredient';
import { useCorrectIngredient } from '../useCorrectIngredient';
import { Box, Typography } from '@material-ui/core';

interface IngredientCorrectionsProps {
  recipeId: string;
  ingredients: IngredientCorrectorIngredient[];
}

const IngredientCorrections: FC<IngredientCorrectionsProps> = ({
  ingredients,
  recipeId,
}) => {
  const { submitChange, submitAdd, submitDelete } = useCorrectIngredient({
    recipeId,
  });

  const [candidates, seemFine] = ingredients.reduce<
    [IngredientCorrectorIngredient[], IngredientCorrectorIngredient[]]
  >(
    ([c, f], ingredient) => {
      if (!ingredient.food || !ingredient.unit) {
        c.push(ingredient);
      } else {
        f.push(ingredient);
      }
      return [c, f];
    },
    [[], []],
  );

  return (
    <Box mb={3}>
      <Typography variant="h4" gutterBottom>
        These might need help
      </Typography>
      {candidates.map(ingredient => (
        <IngredientCorrector
          key={ingredient.id}
          ingredient={ingredient}
          submit={submitChange}
          requestDelete={submitDelete}
        />
      ))}
      <AddIngredient submitAdd={submitAdd} />
      <Typography variant="h4" gutterBottom>
        These seem ok
      </Typography>
      {seemFine.map(ingredient => (
        <IngredientCorrector
          key={ingredient.id}
          ingredient={ingredient}
          submit={submitChange}
          requestDelete={submitDelete}
        />
      ))}
    </Box>
  );
};

export default IngredientCorrections;
