import React, { FC } from 'react';
import { Box, TextArea, Button } from 'grommet';
import { Formik, FieldArray } from 'formik';
import { EditRecipeRecipe, RecipeUpdateInput } from './queries';

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
                        <TextArea
                          value={step}
                          name={`steps.${index}`}
                          onChange={handleChange}
                        />
                        <Button
                          type="button"
                          label="Delete"
                          onClick={() => arrayHelpers.remove(index)}
                        />
                      </div>
                    ))
                  ) : (
                    <div>There are no steps</div>
                  )}

                  <Button
                    type="button"
                    label="Add step"
                    onClick={() => arrayHelpers.push('')}
                  />
                </div>
              )}
            />
            <Button type="submit" label="Save" primary />
          </form>
        )}
      </Formik>
    </Box>
  );
};
