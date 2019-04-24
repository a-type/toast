import React, { FC } from 'react';
import useEditRecipe, { EditRecipeRecipe } from './useEditRecipe';
import { Box, Heading, Form, TextInput, TextArea, Button } from 'grommet';
import { pathOr } from 'ramda';
import { Formik } from 'formik';
import { Field } from 'components/generic';

export interface RecipeEditorProps {
  recipeId?: string;
}

const emptyRecipe: EditRecipeRecipe = {
  id: null,
  title: '',
  description: '',
  servings: 2,
  cookTime: 0,
  prepTime: 0,
  unattendedTime: 0,
  published: false,
};

export const RecipeEditor: FC<RecipeEditorProps> = ({ recipeId }) => {
  const { recipe, initializing, saving, save, error } = useEditRecipe({
    recipeId,
  });
  return (
    <Box>
      <Formik
        initialValues={recipe || emptyRecipe}
        enableReinitialize
        onSubmit={save}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Heading level="2">
              {!recipeId ? 'Create recipe' : 'Edit recipe'}
            </Heading>
            <Field label="Title" required>
              <TextInput
                size="xlarge"
                value={values.title}
                onChange={handleChange}
                name="title"
              />
            </Field>
            <Field label="Description">
              <TextArea
                name="description"
                onChange={handleChange}
                value={values.description}
              />
            </Field>

            <Button
              type="submit"
              primary
              label={!recipeId ? 'Continue' : 'Save'}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RecipeEditor;
