import React, { FC, useState, FormEvent } from 'react';
import Popup from 'components/generic/Popup';
import {
  MenuItem,
  Box,
  Button,
  makeStyles,
  InputLabel,
  Divider,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import RecipeCollections from './RecipeCollections';
import RecipeCollection from './RecipeCollection';
import { ArrowBackIosTwoTone, ClearTwoTone } from '@material-ui/icons';
import { Row } from 'components/generic/Row';
import RecipeCard from './RecipeCard';
import { useAddPlanMeal } from 'hooks/features/useAddPlanMeal';
import { RecipeCollectionRecipe } from 'hooks/features/useCollection';
import { TextField, SliderField } from 'components/fields';
import { fade } from '@material-ui/core/styles';

export type PlanAddModalProps = {
  onClose: () => any;
  day: Date;
  groupId: string;
  onAdd?: () => any;
};

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(2),
  },
  label: {
    marginBottom: theme.spacing(1),
  },
  recipeLabel: {
    margin: theme.spacing(1),
  },
  recipeBox: {
    marginBottom: theme.spacing(2),
    border: `1px solid ${fade(theme.palette.text.primary, 0.2)}`,
    borderRadius: theme.shape.borderRadius,
  },
  scrollArea: {
    maxHeight: '40vh',
    minHeight: '20vh',
    overflowY: 'auto',
    padding: theme.spacing(1),
    paddingBottom: 0,
  },
  divider: {},
  resetButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const PlanAddModal: FC<PlanAddModalProps> = ({
  onClose,
  onAdd,
  day,
  groupId,
}) => {
  const classes = useStyles({});
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [
    selectedRecipe,
    setSelectedRecipe,
  ] = useState<RecipeCollectionRecipe | null>(null);
  const [mealName, setMealName] = useState('Dinner');
  const [servings, setServings] = useState(1);
  const [note, setNote] = useState('');

  const handleRecipeSelected = (recipe: RecipeCollectionRecipe) => {
    setSelectedRecipe(recipe);
    setServings(recipe.servings);
  };

  const resetCollection = () => {
    setSelectedCollection(null);
    setSelectedRecipe(null);
  };

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 200);
  };

  const [addPlanMeal] = useAddPlanMeal({ groupId });

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    await addPlanMeal({
      variables: {
        input: {
          date: day.getTime(),
          servings,
          mealName,
          note,
          recipeId: selectedRecipe && selectedRecipe.id,
        },
      },
    });
    onAdd && onAdd();
    handleClose();
  };

  return (
    <Popup open={open} onClose={handleClose} title="Plan a meal">
      <form onSubmit={onSubmit}>
        <DialogContent>
          <TextField
            select
            label="Meal name"
            name="mealName"
            variant="filled"
            fullWidth
            className={classes.field}
            onChange={ev => setMealName(ev.target.value)}
            value={mealName}
            defaultValue="Dinner"
          >
            <MenuItem value="Breakfast">Breakfast</MenuItem>
            <MenuItem value="Lunch">Lunch</MenuItem>
            <MenuItem value="Dinner">Dinner</MenuItem>
          </TextField>
          {!selectedRecipe ? (
            <Box className={classes.recipeBox}>
              <InputLabel className={classes.recipeLabel}>
                Choose a recipe
              </InputLabel>
              <>
                <div className={classes.scrollArea}>
                  {!selectedCollection ? (
                    <RecipeCollections
                      onCollectionSelected={setSelectedCollection}
                      small
                    />
                  ) : (
                    <RecipeCollection
                      collectionId={selectedCollection.id}
                      onRecipeSelected={handleRecipeSelected}
                      small
                    />
                  )}
                </div>
                {!!selectedCollection && (
                  <>
                    <Divider className={classes.divider} />
                    <Button
                      variant="text"
                      onClick={resetCollection}
                      className={classes.resetButton}
                    >
                      <ArrowBackIosTwoTone /> Back
                    </Button>
                  </>
                )}
              </>
            </Box>
          ) : (
            <Box mb={2}>
              <RecipeCard recipe={selectedRecipe} hideSave />
              <Button
                variant="text"
                onClick={resetCollection}
                className={classes.resetButton}
              >
                <ClearTwoTone /> Change recipe
              </Button>
              <Divider className={classes.divider} />
            </Box>
          )}
          {selectedRecipe && (
            <SliderField
              fullWidth
              className={classes.field}
              label={`Servings: ${servings}`}
              SliderProps={{
                defaultValue: selectedRecipe.servings,
                step: null,
                marks: [
                  {
                    value: selectedRecipe.servings / 2,
                    label: '1/2',
                  },
                  {
                    value: selectedRecipe.servings,
                    label: 'x1',
                  },
                  {
                    value: selectedRecipe.servings * 2,
                    label: 'x2',
                  },
                  {
                    value: selectedRecipe.servings * 3,
                    label: 'x3',
                  },
                ],
                min: selectedRecipe.servings / 2,
                max: selectedRecipe.servings * 3,
                value: servings,
                onChange: (_ev, value) => setServings(value as number),
              }}
            />
          )}
          <TextField
            multiline
            fullWidth
            label="Note"
            name="note"
            onChange={ev => setNote(ev.target.value)}
            value={note}
            className={classes.field}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Popup>
  );
};
