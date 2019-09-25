import React, { FC, useCallback } from 'react';
import {
  makeStyles,
  Theme,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  FormHelperText,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { FullRecipe } from 'hooks/features/fragments';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import { useCreateRecipe } from 'hooks/features/useCreateRecipe';
import useRouter from 'use-react-router';
import { path } from 'ramda';
import { FormikAutoSave } from 'components/generic/FormikAutoSave';

export interface RecipeBasicsEditorProps {
  recipe: FullRecipe;
}

const emptyRecipe: FullRecipe = {
  id: null,
  title: '',
  introduction: null,
  description: '',
  servings: 2,
  cookTime: 0,
  prepTime: 0,
  unattendedTime: 0,
  published: false,
  private: false,
  steps: [],
  ingredientsConnection: {
    edges: [],
  },
  sourceUrl: null,
  attribution: null,
  coverImageUrl: null,
  coverImageAttribution: null,
};

const useStyles = makeStyles<Theme, RecipeBasicsEditorProps>(theme => ({
  titleField: {
    '& input': {
      fontSize: theme.typography.h2.fontSize,
    },
  },
}));

export const RecipeBasicsEditor: FC<RecipeBasicsEditorProps> = props => {
  const classes = useStyles(props);
  const { recipe } = props;

  const { history } = useRouter();

  const [createRecipe, { error: createError }] = useCreateRecipe();
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
        private: isPrivate,
      };

      form.setSubmitting(true);
      try {
        if (recipe) {
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
        } else {
          const result = await createRecipe({
            variables: {
              input: {
                fields,
              },
            },
          });
          history.push(
            `/recipes/${path(
              ['data', 'createRecipe', 'recipe', 'id'],
              result,
            )}/edit`,
          );
        }
      } finally {
        form.setSubmitting(false);
      }
    },
    [createRecipe, updateRecipe, recipe],
  );

  return (
    <Formik<FullRecipe>
      initialValues={recipe || emptyRecipe}
      enableReinitialize
      onSubmit={save}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                required
                fullWidth
                label="Title"
                value={values.title}
                onChange={handleChange}
                name="title"
                className={classes.titleField}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                label="Description"
                name="description"
                multiline
                fullWidth
                onChange={handleChange}
                value={values.description}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <FormControlLabel
                label="Private"
                control={
                  <Checkbox
                    name="private"
                    onChange={handleChange}
                    checked={values.private}
                  />
                }
              />
              <FormHelperText>
                Private recipes can only be seen by you and other members of
                your plan
              </FormHelperText>
            </Grid>
          </Grid>

          {!recipe ? (
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: '16px' }}
            >
              Create Recipe
            </Button>
          ) : (
            <FormikAutoSave />
          )}
        </form>
      )}
    </Formik>
  );
};
