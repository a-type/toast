import React, { FC, useCallback } from 'react';
import {
  makeStyles,
  Theme,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
} from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { FullRecipe } from 'hooks/features/useFullRecipe';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import { useCreateRecipe } from 'hooks/features/useCreateRecipe';
import useRouter from 'use-react-router';
import { path } from 'ramda';

export interface RecipeDetailsEditorProps {
  recipe: FullRecipe;
}

const emptyRecipe: FullRecipe = {
  id: null,
  title: '',
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
};

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
  titleField: {
    '& input': {
      fontSize: theme.typography.h2.fontSize,
    },
  },
}));

export const RecipeDetailsEditor: FC<RecipeDetailsEditorProps> = props => {
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
        prepTime,
        cookTime,
        unattendedTime,
        servings,
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
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
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
              <Typography variant="caption" paragraph>
                Private recipes can only be seen by you and other members of
                your plan
              </Typography>
            </Grid>
          </Grid>

          <ExpansionPanel elevation={0} className={classes.optionalPanel}>
            <ExpansionPanelSummary className={classes.optionalPanelSummary}>
              <Typography variant="button">Optional fields</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.optionalPanelDetails}>
              <Grid container spacing={2}>
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
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : !recipe ? 'Continue' : 'Save'}
          </Button>
        </form>
      )}
    </Formik>
  );
};
