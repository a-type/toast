import React, { FC, useState } from 'react';
import {
  Box,
  Typography,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from '@material-ui/core';
import RecipeCard from './RecipeCard';
import { MoreVertTwoTone } from '@material-ui/icons';
import { useRemovePlanMeal } from 'hooks/features/useRemovePlanMeal';

export type PlanMealProps = {
  meal: PlanMealPlanMeal;
};

export type PlanMealPlanMeal = {
  id: string;
  date: string;
  mealName: string;
  note: string | null;
  cooking: PlanMealRecipe | null;
};

export type PlanMealRecipe = {
  id: string;
  title: string;
  description: string | null;
  coverImageUrl: string | null;
  attribution: string | null;
};

const useStyles = makeStyles(theme => ({
  mealName: {
    margin: 'auto auto auto 0',
  },
  menuButton: {
    margin: 'auto 0 auto auto',
  },
}));

export const PlanMeal: FC<PlanMealProps> = ({ meal }) => {
  const classes = useStyles({ meal });
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const removeMeal = useRemovePlanMeal();
  const handleRemove = async () => {
    await removeMeal({
      variables: {
        input: {
          id: meal.id,
        },
      },
    });
    setMenuAnchor(null);
  };

  return (
    <Box mb={3}>
      <Box mb={1} width="100%" display="flex" flexDirection="row">
        <Typography variant="h5" className={classes.mealName}>
          {meal.mealName}
        </Typography>
        <IconButton
          onClick={ev => setMenuAnchor(ev.currentTarget)}
          aria-controls="meal-menu"
          aria-haspopup="true"
          className={classes.menuButton}
        >
          <MoreVertTwoTone />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={!!menuAnchor}
          keepMounted
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={handleRemove}>Remove meal</MenuItem>
        </Menu>
      </Box>
      {meal.note && <PlanMealNote>{meal.note}</PlanMealNote>}
      {meal.cooking && <RecipeCard hideSave recipe={meal.cooking} />}
    </Box>
  );
};

const useNoteStyles = makeStyles(theme => ({
  box: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

const PlanMealNote: FC = ({ children }) => {
  const classes = useNoteStyles({ children });

  return (
    <Paper className={classes.box}>
      <Typography variant="subtitle1">Note</Typography>
      {children}
    </Paper>
  );
};
