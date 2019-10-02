import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { RecipeCollections } from 'components/features/RecipeCollections';
import {
  Container,
  makeStyles,
  Typography,
  Theme,
  Button,
  Paper,
} from '@material-ui/core';
import { FindInPageTwoTone, AddCircleTwoTone } from '@material-ui/icons';
import Link from 'components/generic/Link';
import { AuthoredRecipes } from 'components/features/recipes/AuthoredRecipes';
import { EditRecipePage } from './EditRecipePage';
import { RecipeViewPage } from './RecipeViewPage';
import { ScanPage } from './ScanPage';
import { RecipeStepsPage } from './RecipeStepsPage';

export const RecipePage = () => (
  <Switch>
    <Route path="/recipes/scan" component={ScanPage} />
    <Route
      path={['/recipes/create', '/recipes/:recipeId/edit'] as any}
      component={EditRecipePage}
    />
    <Route path="/recipes/:recipeId/steps" component={RecipeStepsPage} />
    <Route path="/recipes/:recipeId" component={RecipeViewPage} />
    <Route path="/recipes" exact component={RecipesHomePage} />
  </Switch>
);

const useHomePageStyles = makeStyles<Theme, {}>(theme => ({
  paper: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
  headingRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
  },
  heading: {
    flex: '1',
  },
}));

export const RecipesHomePage: FC = () => {
  const classes = useHomePageStyles({});

  return (
    <Container>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.headingRow}>
          <Typography variant="h2" className={classes.heading}>
            Your Recipes
          </Typography>
          <Button component={Link} to="/recipes/create">
            <AddCircleTwoTone /> Add new
          </Button>
        </div>
        <AuthoredRecipes />
      </Paper>
      <Paper className={classes.paper} elevation={0}>
        <div className={classes.headingRow}>
          <Typography variant="h2" className={classes.heading}>
            Your Collections
          </Typography>
          <Button component={Link} to="/recipes/scan">
            <FindInPageTwoTone /> Scan new
          </Button>
        </div>
        <RecipeCollections />
      </Paper>
    </Container>
  );
};
