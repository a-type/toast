import React, { FC } from 'react';
import { RecipeCollections } from 'components/recipes/RecipeCollections';
import {
  Container,
  makeStyles,
  Typography,
  Theme,
  Button,
  Paper,
} from '@material-ui/core';
import { FindInPageTwoTone, AddCircleTwoTone } from '@material-ui/icons';
import Link from 'components/Link';
import { AuthoredRecipes } from 'components/recipes/AuthoredRecipes';

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

const RecipesHomePage: FC = () => {
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

export default RecipesHomePage;
