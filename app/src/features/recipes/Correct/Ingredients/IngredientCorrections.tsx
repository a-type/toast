import React, { FC } from 'react';
import IngredientCorrector from './IngredientCorrector';
import { IngredientCorrectorIngredient } from '../types';
import { AddIngredient } from './AddIngredient';
import { useCorrectIngredient } from '../useCorrectIngredient';
import {
  Box,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';

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
    <Box mb={2}>
      <Box mb={2}>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Typography variant="h4">These might need help</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Box display="flex" flexDirection="column" width="100%">
              {candidates.map(ingredient => (
                <IngredientCorrector
                  key={ingredient.id}
                  ingredient={ingredient}
                  submit={submitChange}
                  requestDelete={submitDelete}
                />
              ))}
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Typography variant="h4" gutterBottom>
              These seem ok
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Box display="flex" flexDirection="column" width="100%">
              {seemFine.map(ingredient => (
                <IngredientCorrector
                  key={ingredient.id}
                  ingredient={ingredient}
                  submit={submitChange}
                  requestDelete={submitDelete}
                />
              ))}
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>

      <AddIngredient submitAdd={submitAdd} />
    </Box>
  );
};

export default IngredientCorrections;
