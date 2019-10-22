import React, { FC, useCallback } from 'react';
import { makeStyles, Theme, Grid, TextField } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { FullRecipe } from 'hooks/features/fragments';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import { FormikAutoSave } from 'components/FormikAutoSave';

export interface RecipeDetailsEditorProps {
  recipe: FullRecipe;
}

const useStyles = makeStyles<Theme, RecipeDetailsEditorProps>(theme => ({}));

type DetailsFormValues = {
  prepTime: number;
  cookTime: number;
  unattendedTime: number;
  servings: number;
};

export const RecipeDetailsEditor: FC<RecipeDetailsEditorProps> = props => {
  const classes = useStyles(props);
  const { recipe } = props;

  const [updateRecipe, { error: updateError }] = useUpdateRecipe();

  const save = useCallback(
    async (
      { prepTime, cookTime, unattendedTime, servings }: DetailsFormValues,
      form: FormikHelpers<FullRecipe>,
    ) => {
      const fields = {
        prepTime,
        cookTime,
        unattendedTime,
        servings,
      };

      form.setSubmitting(true);
      try {
        await updateRecipe({
          variables: {
            input: {
              id: recipe.id,
              fields,
            },
          },
        });
      } finally {
        form.setSubmitting(false);
      }
    },
    [updateRecipe, recipe],
  );

  const initialValues: DetailsFormValues = {
    servings: recipe.servings || 1,
    prepTime: recipe.prepTime || 0,
    cookTime: recipe.cookTime || 0,
    unattendedTime: recipe.unattendedTime || 0,
  };

  return (
    <Formik<DetailsFormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={save}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
              <TextField
                label="Servings"
                type="number"
                name="servings"
                fullWidth
                onChange={handleChange}
                value={values.servings}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <TextField
                label="Cook time (minutes)"
                type="number"
                name="cookTime"
                fullWidth
                onChange={handleChange}
                value={values.cookTime}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <TextField
                label="Prep time (minutes)"
                type="number"
                name="prepTime"
                fullWidth
                onChange={handleChange}
                value={values.prepTime}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
              <TextField
                label="Unattended time (minutes)"
                type="number"
                name="unattendedTime"
                fullWidth
                onChange={handleChange}
                value={values.unattendedTime}
                helperText="Unattended time is any time you spend slow cooking, baking, sous vide... any time you don't have to actively do anything during cooking."
              />
            </Grid>
          </Grid>

          <FormikAutoSave />
        </form>
      )}
    </Formik>
  );
};
