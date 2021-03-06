import React, { FC, useCallback } from 'react';
import { path } from 'ramda';
import { Loader } from 'components/Loader/Loader';
import ErrorMessage from 'components/ErrorMessage';
import { Box, Button, Typography, makeStyles, Paper } from '@material-ui/core';
import useFullRecipe from 'hooks/features/useFullRecipe';
import { FullRecipe } from 'hooks/features/fragments';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import * as colors from 'themes/colors';
import { LabelTwoTone } from '@material-ui/icons';
import { RecipeIngredientsEditor } from './RecipeIngredientsEditor';
import { RecipeStepsEditor } from './RecipeStepsEditor';
import { RecipeDetailsEditor } from './RecipeDetailsEditor';
import { RecipeBasicsEditor } from './RecipeBasicsEditor';
import { RecipeIntroductionEditor } from './RecipeIntroductionEditor';
import { RecipeCoverImageEditor } from './RecipeCoverImageEditor';

export interface RecipeEditorProps {
  recipeId?: string;
}

const useStyles = makeStyles(theme => ({
  draftLabel: {
    color: colors.darkGreen[900],
    marginBottom: theme.spacing(1),
  },
  publishPanel: {
    background: colors.green[500],
    color: colors.darkGreen[900],
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& > *': {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  publishButton: {
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
}));

export const RecipeEditor: FC<RecipeEditorProps> = ({ recipeId }) => {
  const { data, loading: recipeLoading, error: recipeError } = useFullRecipe(
    recipeId,
    { skip: !recipeId },
  );
  const [updateRecipe, { error: updateError }] = useUpdateRecipe();

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

  const recipe = path(['recipe'], data) as FullRecipe;
  const published = !!path(['published'], recipe);
  const error = recipeError || updateError;

  return (
    <Box>
      {error && <ErrorMessage error={error} />}
      {!published && recipe && (
        <Paper className={classes.publishPanel} elevation={0}>
          <LabelTwoTone className={classes.draftLabel} />
          <Typography style={{ flex: '1' }}>
            Your recipe is unpublished. Publish it so you can start using it!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={publish}
            className={classes.publishButton}
          >
            Publish
          </Button>
        </Paper>
      )}

      {recipe && <RecipeCoverImageEditor recipe={recipe} />}

      <Paper className={classes.paper} elevation={0}>
        <RecipeBasicsEditor recipe={recipe} />
      </Paper>

      {recipe && (
        <Paper className={classes.paper} elevation={0}>
          <section className={classes.section}>
            <Typography variant="h4" gutterBottom>
              Introduction
            </Typography>
            <RecipeIntroductionEditor recipe={recipe} />
          </section>

          <section className={classes.section}>
            <Typography variant="h4" gutterBottom>
              Details
            </Typography>
            <RecipeDetailsEditor recipe={recipe} />
          </section>

          <section className={classes.section}>
            <Typography variant="h4" gutterBottom>
              Ingredients (
              {path(['ingredientsConnection', 'edges', 'length'], recipe) ||
                'None'}
              )
            </Typography>
            <RecipeIngredientsEditor recipe={recipe} width="100%" />
          </section>

          <section className={classes.section}>
            <Typography variant="h4" gutterBottom>
              Steps (
              {path(['stepsConnection', 'edges', 'length'], recipe) || 'None'})
            </Typography>
            <RecipeStepsEditor recipe={recipe} width="100%" />
          </section>
        </Paper>
      )}
    </Box>
  );
};

export default RecipeEditor;
