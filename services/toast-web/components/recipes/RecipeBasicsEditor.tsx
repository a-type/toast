import React, { FC, useCallback } from 'react';
import {
  makeStyles,
  Theme,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { FullRecipe } from 'hooks/features/fragments';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import { useCreateRecipe } from 'hooks/features/useCreateRecipe';
import { useRouter } from 'next/router';
import { path } from 'ramda';
import { useSnackbar } from 'notistack';

export interface RecipeBasicsEditorProps {
  recipe: FullRecipe;
}

type BasicsFormValues = {
  title: string;
  description: string;
  private: boolean;
};

const useStyles = makeStyles<Theme, RecipeBasicsEditorProps>(theme => ({
  titleField: {
    '& textarea': {
      fontSize: theme.typography.h2.fontSize,
      lineHeight: 1.25,
    },
  },
}));

export const RecipeBasicsEditor: FC<RecipeBasicsEditorProps> = props => {
  const classes = useStyles(props);
  const { recipe } = props;

  const router = useRouter();

  const [createRecipe, { error: createError }] = useCreateRecipe();
  const [updateRecipe, { error: updateError }] = useUpdateRecipe();

  const { enqueueSnackbar } = useSnackbar();

  const save = useCallback(
    async (
      { title, description, private: isPrivate }: BasicsFormValues,
      form: FormikHelpers<BasicsFormValues>,
    ) => {
      const fields = {
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
          router.push(
            `/recipes/${path(
              ['data', 'createRecipe', 'recipe', 'id'],
              result,
            )}/edit`,
          );
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar(
          !!recipe
            ? "The recipe couldn't be saved. Please try again."
            : "We couldn't create your recipe just now. Please try again.",
        );
      } finally {
        form.setSubmitting(false);
      }
    },
    [createRecipe, updateRecipe, recipe],
  );

  const initialValues: BasicsFormValues = {
    title: (recipe && recipe.title) || '',
    description: (recipe && recipe.description) || '',
    private: !!recipe && recipe.private,
  };

  return (
    <Formik initialValues={initialValues} enableReinitialize onSubmit={save}>
      {({
        values,
        handleChange,
        setFieldValue,
        handleSubmit,
        isSubmitting,
        dirty,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                required
                fullWidth
                multiline
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
                    value="private"
                    onChange={(_ev, checked) =>
                      setFieldValue('private', checked)
                    }
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

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting || !dirty}
            style={{ marginTop: '16px' }}
          >
            {recipe ? (!dirty ? 'Saved' : 'Save') : 'Create Recipe'}
          </Button>
        </form>
      )}
    </Formik>
  );
};
