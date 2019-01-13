import * as React from 'react';
import CorrectIngredientMutation from './CorrectIngredientMutation';
import IngredientCorrector from './IngredientCorrector';
import {
  RecipeIngredient,
  RecipeIngredientCorrectedValueInput,
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
              />
            ))}
          </div>
        );
      }}
    </CorrectIngredientMutation>
  );
};

export default IngredientCorrections;
