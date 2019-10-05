import { FullRecipe, FullRecipeIngredient } from 'hooks/features/fragments';
import { useCreateIngredient } from 'hooks/features/useCreateIngredient';
import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  makeStyles,
  Theme,
  FormControl,
  FormLabel,
  FormHelperText,
  Card,
  CardContent,
  CardActionArea,
} from '@material-ui/core';
import { Formik, FastField } from 'formik';
import { useUpdateIngredient } from 'hooks/features/useUpdateIngredient';
import { useDeleteIngredient } from 'hooks/features/useDeleteIngredient';
import { AddTwoTone } from '@material-ui/icons';
import { BoxProps } from '@material-ui/core/Box';
import { IngredientEditor } from '../IngredientEditor';
import { colors } from 'themes/colors';
import Popup, { PopupProps } from 'components/generic/Popup';
import { useSnackbar } from 'notistack';

interface RecipeIngredientsEditorProps extends BoxProps {
  recipe: FullRecipe;
}

const useRecipeIngredientsEditorStyles = makeStyles(() => ({}));

export const RecipeIngredientsEditor: FC<
  RecipeIngredientsEditorProps
> = props => {
  const { recipe, ...rest } = props;

  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <Box {...rest}>
      {recipe.ingredientsConnection.edges.map(({ node: ingredient }) => (
        <RecipeIngredientEditor
          ingredient={ingredient}
          key={ingredient.id}
          recipeId={recipe.id}
        />
      ))}
      <Button onClick={() => setAddModalOpen(true)}>
        <AddTwoTone />
        Add Ingredient
      </Button>
      <RecipeIngredientEditModal
        title="Add Ingredient"
        onClose={() => setAddModalOpen(false)}
        open={addModalOpen}
        recipeId={recipe.id}
      />
    </Box>
  );
};

interface RecipeIngredientEditorProps {
  ingredient: FullRecipeIngredient;
  recipeId: string;
}

const useRecipeIngredientEditorStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const RecipeIngredientEditor: FC<RecipeIngredientEditorProps> = ({
  ingredient,
  recipeId,
}) => {
  const classes = useRecipeIngredientEditorStyles({ ingredient });

  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea onClick={() => setShowEdit(true)}>
          <CardContent>{ingredient.text}</CardContent>
        </CardActionArea>
      </Card>
      <RecipeIngredientEditModal
        title="Edit Ingredient"
        onClose={() => setShowEdit(false)}
        open={showEdit}
        ingredient={ingredient}
        recipeId={recipeId}
      />
    </>
  );
};

interface RecipeIngredientEditModalProps extends PopupProps {
  recipeId: string;
  ingredient?: FullRecipeIngredient;
}

const useEditModalStyles = makeStyles<Theme, RecipeIngredientEditModalProps>(
  theme => ({
    ingredientTextField: {
      marginBottom: theme.spacing(2),
    },
    form: {
      margin: theme.spacing(2),
    },
    warning: {
      color: colors.yellow[700],
    },
    button: {
      '& + &': {
        marginLeft: theme.spacing(1),
      },
    },
  }),
);

const RecipeIngredientEditModal: FC<RecipeIngredientEditModalProps> = props => {
  const { open, onClose, ingredient, recipeId, ...rest } = props;
  const classes = useEditModalStyles(props);
  const fieldRef = useRef<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  const [updateMutation] = useUpdateIngredient();
  const [deleteMutation] = useDeleteIngredient();
  const [createMutation] = useCreateIngredient();

  const create = useCallback(
    async (text: string) => {
      await createMutation({
        variables: {
          input: {
            recipeId: recipeId,
            text: text,
          },
        },
      });
    },
    [createMutation, recipeId],
  );

  const updateText = useCallback(
    async newText => {
      await updateMutation({
        variables: {
          input: {
            id: ingredient.id,
            text: newText,
          },
        },
      });
    },
    [updateMutation, ingredient && ingredient.id],
  );

  const deleteIngredient = useCallback(async () => {
    await deleteMutation({
      variables: {
        input: { id: ingredient.id },
      },
    });
  }, [deleteMutation, ingredient && ingredient.id]);

  const handleSubmit = useCallback(
    async (values: { text: string }) => {
      try {
        if (ingredient) {
          await updateText(values.text);
        } else {
          await create(values.text);
        }

        fieldRef.current && fieldRef.current.reset();
        onClose();
      } catch (err) {
        enqueueSnackbar("Couldn't save the ingredient, please try again");
      }
    },
    [ingredient, enqueueSnackbar, onClose],
  );

  const parsedInfo = useMemo(() => {
    if (ingredient && ingredient.food) {
      return `Recognized: ${ingredient.food.name}`;
    } else if (ingredient) {
      return <span className={classes.warning}>No food recognized!</span>;
    } else {
      return 'Like: "1/3 tbsp butter" or "1 slice of bread"';
    }
  }, [ingredient]);

  return (
    <Popup onClose={onClose} open={open} maxWidth="sm" {...rest}>
      <Formik
        initialValues={ingredient || { text: '' }}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <FastField
              name="text"
              render={({ field, form }) => (
                <FormControl fullWidth className={classes.ingredientTextField}>
                  <FormLabel>Ingredient text</FormLabel>
                  <IngredientEditor
                    value={field.value}
                    onChange={text => form.setFieldValue('text', text)}
                    ref={fieldRef}
                  />
                  <FormHelperText>{parsedInfo}</FormHelperText>
                </FormControl>
              )}
            />
            <Box flexDirection="row" display="flex">
              <Button
                color="secondary"
                type="submit"
                variant="contained"
                className={classes.button}
              >
                Submit
              </Button>
              <Button
                variant="text"
                onClick={deleteIngredient}
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
