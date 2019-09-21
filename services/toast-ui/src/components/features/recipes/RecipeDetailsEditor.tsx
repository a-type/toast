import React, { FC, useCallback } from 'react';
import {
  makeStyles,
  Theme,
  Grid,
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { FullRecipe } from 'hooks/features/useFullRecipe';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import useRouter from 'use-react-router';
import { FormikAutoSave } from 'components/generic/FormikAutoSave';

export interface RecipeDetailsEditorProps {
  recipe: FullRecipe;
}

const useStyles = makeStyles<Theme, RecipeDetailsEditorProps>(theme => ({
  optionalPanel: {
    marginBottom: theme.spacing(2),
    backgroundColor: 'transparent',
    padding: 0,
    '&:before': {
      content: '',
      display: 'none',
    },
  },
  optionalPanelSummary: {
    padding: 0,
  },
  optionalPanelDetails: {
    padding: 0,
  },
}));

export const RecipeDetailsEditor: FC<RecipeDetailsEditorProps> = props => {
  const classes = useStyles(props);
  const { recipe } = props;

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
    <Formik<FullRecipe>
      initialValues={recipe}
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
