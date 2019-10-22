import { FullRecipe, FullRecipeStep } from 'hooks/features/fragments';
import React, { FC, useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  makeStyles,
  Theme,
  Button,
} from '@material-ui/core';
import { BoxProps } from '@material-ui/core/Box';
import { EditTwoTone, AddTwoTone } from '@material-ui/icons';
import Popup, { PopupProps } from 'components/Popup';
import { useSnackbar } from 'notistack';
import { useUpdateStep } from 'hooks/features/useUpdateStep';
import { useDeleteStep } from 'hooks/features/useDeleteStep';
import { useCreateStep } from 'hooks/features/useCreateStep';
import { Formik } from 'formik';
import { FormikTextField } from 'components/fields';

interface RecipeStepsEditorProps extends BoxProps {
  recipe: FullRecipe;
}

export const RecipeStepsEditor: FC<RecipeStepsEditorProps> = props => {
  const { recipe, ...rest } = props;

  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <Box {...rest}>
      {recipe.stepsConnection.edges.map(({ node: step }) => (
        <RecipeStepEditor step={step} key={step.id} recipeId={recipe.id} />
      ))}
      <Button onClick={() => setAddModalOpen(true)}>
        <AddTwoTone />
        Add Step
      </Button>
      <RecipeStepEditModal
        title="Add Step"
        onClose={() => setAddModalOpen(false)}
        open={addModalOpen}
        recipeId={recipe.id}
      />
    </Box>
  );
};

interface RecipeStepEditorProps {
  step: FullRecipeStep;
  recipeId: string;
}

const useStepEditorStyles = makeStyles<Theme, RecipeStepEditorProps>(theme => ({
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  content: {
    marginBottom: theme.spacing(1),
  },
}));

const RecipeStepEditor: FC<RecipeStepEditorProps> = props => {
  const { step, recipeId } = props;
  const classes = useStepEditorStyles(props);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <Paper className={classes.paper} elevation={1}>
        <div className={classes.content}>
          <Typography paragraph>{step.text}</Typography>
        </div>
        <div>
          <Button onClick={() => setShowEdit(true)} size="small">
            <EditTwoTone /> Edit
          </Button>
        </div>
      </Paper>
      <RecipeStepEditModal
        title="Edit Step"
        onClose={() => setShowEdit(false)}
        open={showEdit}
        step={step}
        recipeId={recipeId}
      />
    </>
  );
};

interface RecipeStepEditModalProps extends PopupProps {
  recipeId: string;
  step?: FullRecipeStep;
}

const useEditModalStyles = makeStyles<Theme, RecipeStepEditModalProps>(
  theme => ({
    textField: {
      marginBottom: theme.spacing(2),
    },
    form: {
      margin: theme.spacing(2),
    },
    button: {
      '& + &': {
        marginLeft: theme.spacing(1),
      },
    },
  }),
);

const RecipeStepEditModal: FC<RecipeStepEditModalProps> = props => {
  const { open, onClose, step, recipeId, ...rest } = props;
  const classes = useEditModalStyles(props);
  const { enqueueSnackbar } = useSnackbar();

  const [updateMutation] = useUpdateStep();
  const [deleteMutation] = useDeleteStep();
  const [createMutation] = useCreateStep();

  const create = useCallback(
    async (text: string) => {
      await createMutation({
        variables: {
          input: {
            recipeId,
            text,
          },
        },
      });
    },
    [createMutation, recipeId],
  );

  const update = useCallback(
    async (text: string) => {
      await updateMutation({
        variables: {
          input: {
            id: step.id,
            text,
          },
        },
      });
    },
    [updateMutation, step && step.id],
  );

  const deleteStep = useCallback(async () => {
    await deleteMutation({
      variables: {
        input: { id: step.id },
      },
    });
  }, [deleteMutation, step && step.id]);

  const handleSubmit = useCallback(
    async (values: { text: string }) => {
      try {
        if (step) {
          await update(values.text);
        } else {
          await create(values.text);
        }
        onClose();
      } catch (err) {
        enqueueSnackbar("Couln't save the step, please try again");
      }
    },
    [step, enqueueSnackbar, onClose],
  );

  return (
    <Popup onClose={onClose} open={open} maxWidth="md" {...rest}>
      <Formik initialValues={step || { text: '' }} onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormikTextField
              name="text"
              multiline
              label="Step text"
              required
              className={classes.textField}
            />
            <Box flexDirection="row" display="flex">
              <Button
                color="secondary"
                type="submit"
                variant="contained"
                className={classes.button}
              >
                Save
              </Button>
              <Button
                variant="text"
                onClick={deleteStep}
                className={classes.button}
              >
                Delete
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Popup>
  );
};
