import * as React from 'react';
import {
  RecipeIngredient,
  RecipeIngredientCorrectedValueInput,
} from 'generated/schema';
import { Formik } from 'formik';
import { Field } from 'components/generic';
import { Picker } from 'features/ingredients';
import { Button, TextInput, Paragraph } from 'grommet';

interface IngredientCorrectorProps {
  recipeIngredient: RecipeIngredient;
  submit(id: string, correction: RecipeIngredientCorrectedValueInput): void;
  requestDelete(id: string): void;
}

const IngredientCorrector: React.SFC<IngredientCorrectorProps> = ({
  recipeIngredient,
  submit,
  requestDelete,
}) => {
  const handleSubmit = (values: RecipeIngredient) => {
    submit(recipeIngredient.id, {
      unit: values.unit,
      value: values.value,
      ingredientId: values.ingredient.id,
      unitStart: values.unitStart,
      unitEnd: values.unitEnd,
      valueStart: values.valueStart,
      valueEnd: values.valueEnd,
      ingredientStart: values.ingredientStart,
      ingredientEnd: values.ingredientEnd,
      text: values.text,
    });
  };

  return (
    <Formik initialValues={recipeIngredient} onSubmit={handleSubmit}>
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: 'var(--spacing-lg)' }}
        >
          <Paragraph>{recipeIngredient.text}</Paragraph>
          <Field label="Value">
            <TextInput
              type="number"
              value={`${values.value}`}
              onChange={handleChange}
            />
          </Field>
          <Field label="Unit">
            <TextInput value={values.unit} onChange={handleChange} />
          </Field>
          <Field label="Ingredient">
            <Picker
              onChange={ing => setFieldValue('ingredient', ing)}
              value={values.ingredient}
              canCreate
            />
          </Field>
          <Button primary type="submit" label="Submit correction" />
          <Button
            color="status-critical"
            onClick={() => requestDelete(recipeIngredient.id)}
            label="Delete this ingredient"
          />
        </form>
      )}
    </Formik>
  );
};

export default IngredientCorrector;
