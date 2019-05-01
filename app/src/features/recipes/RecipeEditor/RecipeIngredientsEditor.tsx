import React, { FC } from 'react';
import { EditRecipeRecipe } from './useEditRecipe';
import { Box, TextArea, Button } from 'grommet';
import { Formik } from 'formik';
import { Field } from 'components/generic';

export interface RecipeIngredientsEditorProps {
  recipe: EditRecipeRecipe;
  createIngredient: (args: {
    recipeId: string;
    ingredientText: string;
  }) => Promise<void>;
}

export const RecipeIngredientsEditor: FC<RecipeIngredientsEditorProps> = ({
  recipe,
  createIngredient,
}) => {
  return (
    <Box>
      <div>{JSON.stringify(recipe.ingredients)}</div>
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
