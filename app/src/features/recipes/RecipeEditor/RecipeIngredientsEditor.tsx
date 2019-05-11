import React, { FC } from 'react';
import { EditRecipeRecipe } from './useEditRecipe';
import { Box, TextArea, Button } from 'grommet';
import { Formik } from 'formik';
import { Field } from 'components/generic';
import IngredientCorrector, {
  IngredientCorrectorMessages,
} from 'features/recipes/Correct/Ingredients/IngredientCorrector';
import { useCorrectIngredient } from '../Correct/useCorrectIngredient';

export interface RecipeIngredientsEditorProps {
  recipe: EditRecipeRecipe;
  createIngredient: (args: {
    recipeId: string;
    ingredientText: string;
  }) => Promise<void>;
}

const CORRECTOR_MESSAGES: IngredientCorrectorMessages = {
  suggestChange: 'Change',
  suggestDelete: 'Delete',
  correctionSubmitted: 'Saved',
  submitCorrection: 'Save',
};

export const RecipeIngredientsEditor: FC<RecipeIngredientsEditorProps> = ({
  recipe,
  createIngredient,
}) => {
  const { submitChange, submitDelete } = useCorrectIngredient({
    recipeId: recipe.id,
  });

  return (
    <Box>
      <Box>
        {recipe.ingredients.map(recipeIngredient => (
          <IngredientCorrector
            key={recipeIngredient.id}
            recipeIngredient={recipeIngredient}
            submit={submitChange}
            requestDelete={submitDelete}
            messages={CORRECTOR_MESSAGES}
          />
        ))}
      </Box>
      <Formik
        onSubmit={createIngredient}
        initialValues={{ ingredientText: '' }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <Field label="Add ingredient" required>
              <TextArea
                value={values.ingredientText}
                onChange={handleChange}
                name="ingredientText"
              />
            </Field>
            <Button type="submit" primary label="Add" />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RecipeIngredientsEditor;
