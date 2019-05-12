import React, { FC, useState } from 'react';
import { Box, Button, Paragraph, DropButton, TextArea } from 'grommet';
import { Icon, Field } from 'components/generic';
import { EditRecipeRecipeStep, EditRecipeUpdateStepInput } from './queries';
import { Formik } from 'formik';

export interface RecipeStepEditorProps {
  step: EditRecipeRecipeStep;
  updateStep: (input: EditRecipeUpdateStepInput) => Promise<any>;
  deleteStep: (id: string) => Promise<any>;
}

export const RecipeStepEditor: FC<RecipeStepEditorProps> = ({
  step,
  updateStep,
  deleteStep,
}) => {
  const [showForm, setShowForm] = useState(false);

  if (!showForm) {
    return (
      <Box width="100%" direction="row">
        <Box flex="grow" alignContent="stretch">
          <Paragraph>{step.text}</Paragraph>
        </Box>
        <Box justify="center">
          <DropButton
            icon={<Icon name="more_vert" />}
            dropAlign={{ right: 'right', top: 'top' }}
            dropContent={
              <Box pad="medium" round background="white">
                <Button
                  label="Edit"
                  onClick={() => setShowForm(true)}
                  margin={{ bottom: 'small' }}
                />
                <Button
                  color="status-critical"
                  onClick={async () => {
                    await deleteStep(step.id);
                    setShowForm(false);
                  }}
                  label="Delete"
                />
              </Box>
            }
          />
        </Box>
      </Box>
    );
  }

  return (
    <Formik
      initialValues={{ text: step.text }}
      onSubmit={async values => {
        await updateStep({ ...values, recipeStepId: step.id });
        setShowForm(false);
      }}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <Field label="Step text" required>
            <TextArea value={values.text} onChange={handleChange} name="text" />
            <Button type="submit" label="Save" />
          </Field>
        </form>
      )}
    </Formik>
  );
};

export default RecipeStepEditor;
