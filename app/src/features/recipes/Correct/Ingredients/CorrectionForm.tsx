import React, { FC } from 'react';
import { Formik } from 'formik';
import { Picker } from 'features/ingredients';
import { TextField, Box, Button, Grid } from '@material-ui/core';

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

export type IngredientCorrectionFormMessages = {
  submitCorrection: string;
};

export interface IngredientCorrectionFormProps {
  initialValue?: IngredientCorrectionFormRecipeIngredient;
  onCancel(): void;
  onSubmit(newValue: IngredientCorrectionFormRecipeIngredient): void;
  messages?: IngredientCorrectionFormMessages;
}

export const DEFAULT_MESSAGES: IngredientCorrectionFormMessages = {
  submitCorrection: 'Submit correction',
};

export const IngredientCorrectionForm: FC<IngredientCorrectionFormProps> = ({
  initialValue,
  onCancel,
  onSubmit,
  messages = DEFAULT_MESSAGES,
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                label="Text"
                value={values.text}
                onChange={handleChange}
                name="text"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Quantity"
                required
                name="quantity"
                type="number"
                value={`${values.quantity}`}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Unit"
                required
                name="unit"
                value={values.unit}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Picker
                initialSearchText={ingredientSearchText}
                onChange={ing => setFieldValue('ingredient', ing)}
                value={values.ingredient}
                canCreate
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <Button variant="text" onClick={onCancel}>
                  Cancel
                </Button>{' '}
                <Button color="primary" type="submit">
                  {messages.submitCorrection}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
