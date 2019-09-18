import React, { FC, useCallback } from 'react';
import { path } from 'ramda';
import { Formik, FormikHelpers } from 'formik';
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
  Paper,
} from '@material-ui/core';
import useFullRecipe, { FullRecipe } from 'hooks/features/useFullRecipe';
import { useCreateRecipe } from 'hooks/features/useCreateRecipe';
import { useUpdateRecipe } from 'hooks/features/useUpdateRecipe';
import useRouter from 'use-react-router';
import * as colors from 'themes/colors';
import { LabelTwoTone } from '@material-ui/icons';
import { RecipeIngredientsEditor } from './RecipeIngredientsEditor';
import { RecipeStepsEditor } from './RecipeStepsEditor';
import { RecipeDetailsEditor } from './RecipeDetailsEditor';
import { RecipeBasicsEditor } from './RecipeBasicsEditor';
import { RecipeIntroductionEditor } from './RecipeIntroductionEditor';

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
  firstPanel: {
    padding: theme.spacing(3),
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
      {!published && recipeId && (
        <Paper className={classes.publishPanel}>
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
      <Paper className={classes.firstPanel}>
        <RecipeBasicsEditor recipe={recipe} />
      </Paper>

      {recipe && (
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary>
              <Typography variant="h4">Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RecipeDetailsEditor recipe={recipe} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary>
              <Typography variant="h4">Introduction</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RecipeIntroductionEditor recipe={recipe} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary>
              <Typography variant="h4">
                Ingredients (
                {path(['ingredientsConnection', 'edges', 'length'], recipe) ||
                  'None'}
                )
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RecipeIngredientsEditor recipe={recipe} width="100%" />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary>
              <Typography variant="h4">
                Steps ({path(['steps', 'length'], recipe) || 'None'})
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RecipeStepsEditor recipe={recipe} width="100%" />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      )}
    </Box>
  );
};

export default RecipeEditor;
