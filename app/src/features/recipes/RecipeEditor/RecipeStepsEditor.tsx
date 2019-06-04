import React, { FC } from 'react';
import useEditRecipeSteps from './useEditRecipeSteps';
import { Box, TextArea, Button, Paragraph, DropButton } from 'grommet';
import { Formik } from 'formik';
import { EditRecipeCreateStepInput, EditRecipeRecipe } from './queries';
import { Field, Icon } from 'components/generic';
import RecipeStepEditor from './RecipeStepEditor';

export interface RecipeStepsEditorProps {
  recipe: EditRecipeRecipe;
}

export const RecipeStepsEditor: FC<RecipeStepsEditorProps> = ({ recipe }) => {
  const { createStep, updateStep, deleteStep } = useEditRecipeSteps({
    recipeId: recipe.id,
  });

  return (
    <Box>
      <Box>
        <ol>
          {recipe.steps.map(step => (
            <li key={step}>
              <RecipeStepEditor
                step={step}
                updateStep={updateStep}
                deleteStep={deleteStep}
              />
            </li>
          ))}
        </ol>
      </Box>
      <Formik
        initialValues={{ stepText: '' }}
        onSubmit={async (values, actions) => {
          await createStep({ text: values.stepText });
          actions.resetForm();
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <form onSubmit={handleSubmit}>
            <Field label="Step text" required>
              <TextArea
                value={values.stepText}
                onChange={handleChange}
                name="stepText"
              />
            </Field>
            <Button type="submit" label="Add step" />
          </form>
        )}
      </Formik>
    </Box>
  );
};
