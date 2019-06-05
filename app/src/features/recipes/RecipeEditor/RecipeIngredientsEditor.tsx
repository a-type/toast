import React, { FC } from 'react';
import { EditRecipeRecipe } from './queries';
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
  refetchRecipe: () => Promise<any>;
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
  refetchRecipe,
}) => {
  const { submitChange, submitDelete } = useCorrectIngredient({
    recipeId: recipe.id,
    refetch: refetchRecipe,
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
            <Button type="submit" label="Add ingredient" />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RecipeIngredientsEditor;