import React, { FC } from 'react';
import { Formik } from 'formik';
import { Paragraph, TextInput, Box, Button, TextArea } from 'grommet';
import { Field } from 'components/generic';
import { Picker } from 'features/ingredients';

export interface IngredientCorrectionFormRecipeIngredient {
  text: string;
  quantity: number;
  unit?: string;
  ingredient?: {
    id: string;
    name: string;
  };
  ingredientStart?: number;
  ingredientEnd?: number;
}

export interface IngredientCorrectionFormProps {
  initialValue?: IngredientCorrectionFormRecipeIngredient;
  onCancel(): void;
  onSubmit(newValue: IngredientCorrectionFormRecipeIngredient): void;
}

export const IngredientCorrectionForm: FC<IngredientCorrectionFormProps> = ({
  initialValue,
  onCancel,
  onSubmit,
}) => {
  const ingredientSearchText =
    initialValue.text &&
    initialValue.ingredientStart &&
    initialValue.ingredientEnd
      ? initialValue.text.slice(
          initialValue.ingredientStart,
          initialValue.ingredientEnd,
        )
      : '';

  return (
    <Formik initialValues={initialValue} onSubmit={onSubmit}>
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: 'var(--spacing-lg)' }}
        >
          <Field label="Text" required>
            <TextArea value={values.text} onChange={handleChange} name="text" />
          </Field>
          <Field label="Quantity" required>
            <TextInput
              name="quantity"
              type="number"
              value={`${values.quantity}`}
              onChange={handleChange}
            />
          </Field>
          <Field label="Unit">
            <TextInput
              name="unit"
              value={values.unit}
              onChange={handleChange}
            />
          </Field>
          <Field label="Ingredient">
            <Picker
              initialSearchText={ingredientSearchText}
              onChange={ing => setFieldValue('ingredient', ing)}
              value={values.ingredient}
              canCreate
            />
          </Field>
          <Box direction="row" margin={{ bottom: 'medium' }}>
            <Button
              primary
              type="submit"
              label="Submit correction"
              margin={{ right: 'medium' }}
            />
            <Button onClick={onCancel} label="Cancel" />
          </Box>
        </form>
      )}
    </Formik>
  );
};
