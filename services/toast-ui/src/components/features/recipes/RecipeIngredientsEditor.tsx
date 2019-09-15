import { FullRecipe, FullRecipeIngredient } from 'hooks/features/useFullRecipe';
import { useCreateIngredient } from 'hooks/features/useCreateIngredient';
import React, { FC, useCallback, ChangeEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import { Formik, FormikHelpers, FastField } from 'formik';
import { FormikTextField } from 'components/fields';
import { useUpdateIngredient } from 'hooks/features/useUpdateIngredient';
import { useDeleteIngredient } from 'hooks/features/useDeleteIngredient';
import { DeleteTwoTone } from '@material-ui/icons';
import { BoxProps } from '@material-ui/core/Box';
import { IngredientEditor } from '../IngredientEditor';

interface RecipeIngredientsEditorProps extends BoxProps {
  recipe: FullRecipe;
}

const useRecipeIngredientsEditorStyles = makeStyles(theme => ({
  addIngredientField: {
    marginBottom: theme.spacing(1),
  },
}));

export const RecipeIngredientsEditor: FC<
  RecipeIngredientsEditorProps
> = props => {
  const { recipe, ...rest } = props;
  const classes = useRecipeIngredientsEditorStyles(props);

  const [createMutation] = useCreateIngredient();

  const create = useCallback(
    async (values: { text: string }, formik: FormikHelpers<any>) => {
      await createMutation({
        variables: {
          input: {
            recipeId: recipe.id,
            text: values.text,
          },
        },
      });
      formik.resetForm();
    },
    [createMutation, recipe.id],
  );

  return (
    <Box {...rest}>
      {recipe.ingredientsConnection.edges.map(({ node: ingredient }) => (
        <RecipeIngredientEditor ingredient={ingredient} key={ingredient.id} />
      ))}
      <Formik initialValues={{ text: '' }} onSubmit={create}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FastField
              name="text"
              render={({ field, form }) => (
                <IngredientEditor
                  value={field.value}
                  onChange={text => form.setFieldValue('text', text)}
                  className={classes.addIngredientField}
                />
              )}
            />
            <Button color="secondary" type="submit" variant="contained">
              Add Ingredient
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

interface RecipeIngredientEditorProps {
  ingredient: FullRecipeIngredient;
}

const useRecipeIngredientEditorStyles = makeStyles(theme => ({
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  deleteButton: {
    flex: '0 0 auto',
    margin: 'auto',
    marignLeft: theme.spacing(1),
  },
}));

const RecipeIngredientEditor: FC<RecipeIngredientEditorProps> = ({
  ingredient,
}) => {
  const classes = useRecipeIngredientEditorStyles({ ingredient });

  const [updateMutation] = useUpdateIngredient();
  const [deleteMutation] = useDeleteIngredient();

  const updateText = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      await updateMutation({
        variables: {
          input: {
            id: ingredient.id,
            text: event.target.value,
          },
        },
      });
    },
    [updateMutation, ingredient.id],
  );

  const updateFields = useCallback(
    async (
      values: { id: string; text: string; quantity: number; unit: string },
      formik: FormikHelpers<any>,
    ) => {
      await updateMutation({
        variables: {
          input: {
            id: ingredient.id,
            fields: {
              ...values,
            },
          },
        },
      });
    },
    [updateMutation, ingredient.id],
  );

  const updateFood = useCallback(
    async (foodId: string) => {
      await updateMutation({
        variables: {
          input: {
            id: ingredient.id,
            foodId,
          },
        },
      });
    },
    [updateMutation, ingredient.id],
  );

  const deleteIngredient = useCallback(async () => {
    await deleteMutation({
      variables: {
        input: { id: ingredient.id },
      },
    });
  }, [deleteMutation, ingredient.id]);

  return (
    <Box className={classes.fieldRow}>
      <TextField
        value={ingredient.text}
        onChange={updateText}
        label="Text"
        fullWidth
      />
      <IconButton
        className={classes.deleteButton}
        aria-label="Delete ingredient"
        onClick={deleteIngredient}
      >
        <DeleteTwoTone />
      </IconButton>
    </Box>
  );
};
