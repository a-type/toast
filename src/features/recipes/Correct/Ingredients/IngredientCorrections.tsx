import * as React from 'react';
import CorrectIngredientMutation from './CorrectIngredientMutation';
import IngredientCorrector from './IngredientCorrector';
import {
  RecipeIngredient,
  RecipeIngredientCorrectedValueInput,
  CorrectionType,
} from 'generated/schema';

interface IngredientCorrectionsProps {
  recipeIngredients: RecipeIngredient[];
}

const IngredientCorrections: React.SFC<IngredientCorrectionsProps> = ({
  recipeIngredients,
}) => {
  return (
    <CorrectIngredientMutation>
      {mutate => {
        const submit = (
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
          <div>
            {recipeIngredients.map(recipeIngredient => (
              <IngredientCorrector
                key={recipeIngredient.id}
                recipeIngredient={recipeIngredient}
                submit={submit}
                requestDelete={requestDelete}
              />
            ))}
          </div>
        );
      }}
    </CorrectIngredientMutation>
  );
};

export default IngredientCorrections;
