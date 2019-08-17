import React, { FC, useState } from 'react';
import Popup from 'components/generic/Popup';
import SelectField from 'components/generic/SelectField';
import {
  MenuItem,
  Box,
  Button,
  TextField,
  makeStyles,
  InputLabel,
  FormControl,
  Divider,
} from '@material-ui/core';
import useForm from 'react-hook-form';
import RecipeCollections from './RecipeCollections';
import RecipeCollection from './RecipeCollection';
import { ArrowBackIosTwoTone, ClearTwoTone } from '@material-ui/icons';
import { Row } from 'components/generic/Row';
import RecipeCard from './RecipeCard';
import { useAddPlanMeal } from 'hooks/features/useAddPlanMeal';

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
    border: `1px solid ${theme.palette.grey[300]}`,
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

type PlanAddFormValues = {
  mealName: string;
  note: string;
  servings: string;
};

export const PlanAddModal: FC<PlanAddModalProps> = ({
  onClose,
  onAdd,
  day,
  groupId,
}) => {
  const classes = useStyles({});
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      mealName: 'Dinner',
      note: '',
    },
  });
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
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

  const onSubmit = async ({ note, servings, mealName }: PlanAddFormValues) => {
    await addPlanMeal({
      variables: {
        input: {
          date: day.getTime(),
          servings: servings !== undefined && parseInt(servings),
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <SelectField
          label="Meal name"
          name="mealName"
          fullWidth
          className={classes.field}
          //onChange={ev => setValue('mealName', ev.target.value)}
          value={watch('mealName', 'Dinner')}
          defaultValue="Dinner"
          inputRef={register}
        >
          <MenuItem value="Breakfast">Breakfast</MenuItem>
          <MenuItem value="Lunch">Lunch</MenuItem>
          <MenuItem value="Dinner">Dinner</MenuItem>
        </SelectField>
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
                    onRecipeSelected={setSelectedRecipe}
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
        <TextField
          fullWidth
          label="Servings"
          name="servings"
          inputRef={register}
          className={classes.field}
          variant="filled"
          type="number"
        />
        <TextField
          multiline
          fullWidth
          label="Note"
          name="note"
          inputRef={register}
          className={classes.field}
          variant="filled"
        />
        <Row>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </Row>
      </form>
    </Popup>
  );
};
