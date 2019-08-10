import React, { FC } from 'react';
import { EditRecipeRecipe } from '../../../hooks/features/queries';
import { Formik } from 'formik';
import { Box, Button, TextField } from '@material-ui/core';

export interface RecipeIngredientsEditorProps {
  recipe: EditRecipeRecipe;
  createIngredient: (args: {
    recipeId: string;
    ingredientText: string;
  }) => Promise<void>;
  refetchRecipe: () => Promise<any>;
}

// const CORRECTOR_MESSAGES: IngredientCorrectorMessages = {
//   suggestChange: 'Change',
//   suggestDelete: 'Delete',
//   correctionSubmitted: 'Saved',
//   submitCorrection: 'Save',
// };

export const RecipeIngredientsEditor: FC<RecipeIngredientsEditorProps> = ({
  recipe,
  createIngredient,
  refetchRecipe,
}) => {
  // const { submitChange, submitDelete } = useCorrectIngredient({
  //   recipeId: recipe.id,
  //   refetch: refetchRecipe,
  // });

  return (
    <Box>
      <Box>
        {/* {recipe.ingredients.map(recipeIngredient => (
          <IngredientCorrector
            key={recipeIngredient.id}
            recipeIngredient={recipeIngredient}
            submit={submitChange}
            requestDelete={submitDelete}
            messages={CORRECTOR_MESSAGES}
          />
        ))} */}
      </Box>
      <Formik
        onSubmit={createIngredient}
        initialValues={{ ingredientText: '' }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Add ingredient"
              required
              value={values.ingredientText}
              onChange={handleChange}
              name="ingredientText"
            />
            <Button type="submit">Add ingredient</Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RecipeIngredientsEditor;
