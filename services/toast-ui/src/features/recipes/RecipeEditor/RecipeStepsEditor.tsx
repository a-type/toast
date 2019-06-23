import React, { FC } from 'react';
import { Formik, FieldArray } from 'formik';
import { EditRecipeRecipe, RecipeUpdateInput } from './queries';
import { TextField, Button, Box } from '@material-ui/core';

export interface RecipeStepsEditorProps {
  recipe: EditRecipeRecipe;
  updateRecipe: (input: RecipeUpdateInput) => any;
}

export const RecipeStepsEditor: FC<RecipeStepsEditorProps> = ({
  recipe,
  updateRecipe,
}) => {
  return (
    <Box>
      <Formik
        onSubmit={({ steps }) => updateRecipe({ id: recipe.id, steps })}
        initialValues={{ steps: recipe.steps }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray
              name="steps"
              render={arrayHelpers => (
                <div>
                  {values.steps && values.steps.length > 0 ? (
                    values.steps.map((step, index) => (
                      <div key={index}>
                        <TextField
                          label="Step"
                          value={step}
                          name={`steps.${index}`}
                          onChange={handleChange}
                        />
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          Delete
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div>There are no steps</div>
                  )}

                  <Button onClick={() => arrayHelpers.push('')}>
                    Add step
                  </Button>
                </div>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
