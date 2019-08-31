import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  makeStyles,
} from '@material-ui/core';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader/Loader';
import { useAuth } from 'contexts/AuthContext';
import { path, pathOr } from 'ramda';
import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import useFullRecipe from 'hooks/features/useFullRecipe';
import { RecipeStepsLink } from './StepsLink';
import Details from './Details';
import Ingredients from './Ingredients';
import { RecipeImage } from '../RecipeImage';
import { ExpandMoreTwoTone } from '@material-ui/icons';

export interface RecipeViewProps {
  recipeId: string;
  servings?: number;
}

const useStyles = makeStyles(theme => ({
  hero: {
    marginBottom: theme.spacing(3),
  },
}));

export const RecipeView: FC<RecipeViewProps> = ({ recipeId, servings }) => {
  const { user } = useAuth();
  const { data, loading, error } = useFullRecipe(recipeId);
  const classes = useStyles({});

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const recipe = data.recipe;

  if (recipe && !recipe.published) {
    if (pathOr('none', ['author', 'id'], recipe) === path(['uid'], user)) {
      return <Redirect to={`/recipes/${recipeId}/edit`} />;
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={2} className={classes.hero}>
        <Grid item xs={12} sm={12} md={5} lg={3} xl={2}>
          <RecipeImage recipe={recipe} />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={9} xl={10}>
          <Typography variant="h1" gutterBottom>
            {recipe.title}
          </Typography>
        </Grid>
      </Grid>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreTwoTone />}>
          <Typography variant="h3">Details</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Details recipe={recipe} servingsOverride={servings} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreTwoTone />}>
          <Typography variant="h3">Ingredients</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Ingredients
            recipeId={recipeId}
            naturalServings={pathOr(1, ['servings'], recipe)}
            servingsOverride={servings}
            ingredients={pathOr(
              [],
              ['ingredientsConnection', 'edges'],
              recipe,
            ).map(({ node }) => node)}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <RecipeStepsLink
        recipe={recipe}
        servingsMultiplier={
          servings && servings / pathOr(1, ['servings'], recipe)
        }
      />
    </React.Fragment>
  );
};

export default RecipeView;
