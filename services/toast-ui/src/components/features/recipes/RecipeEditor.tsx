import React, { FC, useCallback } from 'react';
import { path } from 'ramda';
import { Formik, FormikHelpers, FieldArray } from 'formik';
import { Loader } from 'components/generic/Loader/Loader';
import ErrorMessage from 'components/generic/ErrorMessage';
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  makeStyles,
} from '@material-ui/core';
import useFullRecipe from 'hooks/features/useFullRecipe';
import { useCreateRecipe } from 'hooks/features/useCreateRecipe';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import useRouter from 'use-react-router';
import * as colors from 'themes/colors';
import { LabelTwoTone } from '@material-ui/icons';
import { FormikTextField } from 'components/fields';

export interface RecipeEditorProps {
  recipeId?: string;
}

type RecipeValues = {
  id: string;
  title: string;
  description: string;
  servings: number;
  cookTime: number;
  prepTime: number;
  unattendedTime: number;
  published: boolean;
  private: boolean;
  steps: string[];
};

const emptyRecipe: RecipeValues = {
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
};

const useStyles = makeStyles(theme => ({
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
  draftLabel: {
    color: colors.darkGreen[900],
    marginBottom: theme.spacing(1),
  },
  publishPanel: {
    background: colors.green[500],
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),
    marginTop: theme.spacing(-3),
    padding: theme.spacing(2),
  },
  publishButton: {
    marginBottom: theme.spacing(1),
  },
  titleField: {
    '& input': {
      fontSize: theme.typography.h2.fontSize,
    },
  },
}));

export const RecipeEditor: FC<RecipeEditorProps> = ({ recipeId }) => {
  const { history } = useRouter();

  const { data, loading: recipeLoading, error: recipeError } = useFullRecipe(
    recipeId,
    { skip: !recipeId },
  );
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
      }: RecipeValues,
      form: FormikHelpers<RecipeValues>,
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
        if (recipeId) {
          await updateRecipe({
            variables: {
              input: {
                id: recipeId,
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
    [createRecipe, updateRecipe, recipeId],
  );

  const publish = useCallback(async () => {
    if (!recipeId) {
      return;
    }

    await updateRecipe({
      variables: {
        input: {
          id: recipeId,
          fields: {
            published: true,
          },
        },
      },
    });
  }, [updateRecipe, recipeId]);

  const classes = useStyles({});

  if (recipeLoading) {
    return <Loader />;
  }

  const recipe = path(['recipe'], data) as RecipeValues;
  const published = !!path(['published'], recipe);
  const error = recipeError || createError || updateError;

  return (
    <Box>
      {error && <ErrorMessage error={error} />}
      <Box mb={4}>
        {!published && recipeId && (
          <Box mb={2} className={classes.publishPanel}>
            <Typography className={classes.draftLabel}>
              <LabelTwoTone /> Draft
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={publish}
              className={classes.publishButton}
            >
              Publish
            </Button>
            <Typography>
              Your recipe is unpublished. Publish it so you can start using it!
            </Typography>
          </Box>
        )}
        <Formik<RecipeValues>
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
                {isSubmitting ? 'Saving...' : !recipeId ? 'Continue' : 'Save'}
              </Button>
            </form>
          )}
        </Formik>
      </Box>

      {recipe && (
        <>
          {/* <Typography variant="h3" gutterBottom>
            Ingredients
          </Typography>
          <RecipeIngredientsEditor
            recipe={recipe}
            createIngredient={createIngredient}
            refetchRecipe={refetchRecipe}
          /> */}
          <Typography variant="h3" gutterBottom>
            Steps
          </Typography>
          <RecipeStepsEditor recipe={recipe} save={save} />
        </>
      )}
    </Box>
  );
};

interface RecipeStepsEditorProps {
  save: (values: RecipeValues, form: FormikHelpers<RecipeValues>) => any;
  recipe: RecipeValues;
}

const RecipeStepsEditor: FC<RecipeStepsEditorProps> = ({ save, recipe }) => {
  return (
    <Box>
      <Formik initialValues={recipe} onSubmit={save}>
        {({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <FieldArray
              name="steps"
              render={arrayHelpers => (
                <Box>
                  {(values.steps || []).map((step, idx) => (
                    <Box mb={1} key={idx}>
                      <FormikTextField
                        name={`steps.${idx}`}
                        multiline
                        fullWidth
                      />
                    </Box>
                  ))}
                  <Button variant="text" onClick={() => arrayHelpers.push('')}>
                    Add a step
                  </Button>
                </Box>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RecipeEditor;
