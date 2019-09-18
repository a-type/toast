import { FullRecipe } from 'hooks/features/useFullRecipe';
import { FormikHelpers, Formik, FieldArray } from 'formik';
import React, { FC, useCallback } from 'react';
import { Box, Button } from '@material-ui/core';
import { FormikTextField } from 'components/fields';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import { BoxProps } from '@material-ui/core/Box';
import { FormikAutoSave } from 'components/generic/FormikAutoSave';
import { AddTwoTone } from '@material-ui/icons';

interface RecipeStepsEditorProps extends BoxProps {
  recipe: FullRecipe;
}

export const RecipeStepsEditor: FC<RecipeStepsEditorProps> = props => {
  const { recipe, ...rest } = props;
  const [updateRecipe, { error: updateError }] = useUpdateRecipe();

  const save = useCallback(
    async (
      {
        steps,
        published,
        id,
        title,
        description,
        prepTime,
        cookTime,
        unattendedTime,
        servings,
        private: isPrivate,
      }: FullRecipe,
      form: FormikHelpers<FullRecipe>,
    ) => {
      const fields = {
        published,
        title,
        description,
        prepTime,
        cookTime,
        unattendedTime,
        servings,
        private: isPrivate,
      };

      form.setSubmitting(true);
      try {
        await updateRecipe({
          variables: {
            input: {
              id: recipe.id,
              fields,
              steps: {
                set: steps,
              },
            },
          },
        });
      } finally {
        form.setSubmitting(false);
      }
    },
    [updateRecipe, recipe],
  );

  return (
    <Box {...rest}>
      <Formik initialValues={recipe} onSubmit={save}>
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray
              name="steps"
              render={arrayHelpers => (
                <Box>
                  {(values.steps || []).map((step, idx) => (
                    <Box mb={1} key={idx}>
                      <FormikTextField
                        name={`steps.${idx}`}
                        multiline
                        fullWidth
                      />
                    </Box>
                  ))}
                  <Button variant="text" onClick={() => arrayHelpers.push('')}>
                    <AddTwoTone /> Add a step
                  </Button>
                </Box>
              )}
            />
            <FormikAutoSave />
          </form>
        )}
      </Formik>
    </Box>
  );
};
