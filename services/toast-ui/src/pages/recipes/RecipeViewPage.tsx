import React, { FC, useMemo } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Container,
  Theme,
  Typography,
  Paper,
  Chip,
  Box,
  Avatar,
  ButtonBase,
} from '@material-ui/core';
import { parse } from 'querystring';
import { makeStyles } from '@material-ui/styles';
import { RecipeImage } from 'components/features/recipes/RecipeImage';
import useFullRecipe from 'hooks/features/useFullRecipe';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader';
import { SlateEditor } from 'components/generic/SlateEditor';
import { FullRecipe } from 'hooks/features/fragments';
import { Value } from 'slate';
import { RecipeIngredients } from 'components/features/recipes/RecipeIngredients';
import { RecipeStepsLink } from 'components/features/recipes/RecipeStepsLink';
import Link from 'components/generic/Link';

export interface RecipeViewPageProps
  extends RouteComponentProps<{ recipeId: string }> {}

export const RecipeViewPage: FC<RecipeViewPageProps> = props => {
  const {
    match: { params },
    location,
  } = props;
  const { servings } = parse(location.search.replace('?', ''));
  const servingsValue = servings ? parseInt(servings as string, 10) : undefined;

  const { data, loading, error } = useFullRecipe(params.recipeId);

  if (error) {
    console.error(error);
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loader />; // TODO
  }

  const recipe = data.recipe;

  return <RecipeViewPageContent recipe={recipe} servings={servingsValue} />;
};

const useStyles = makeStyles<Theme, any>(theme => ({
  coverImage: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  center: {
    width: '100%',
    display: 'flex',
    padding: theme.spacing(2),
    '& > *': {
      margin: 'auto',
    },
  },
  authorButton: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  authorName: {
    flex: 1,
  },
}));

const RecipeViewPageContent: FC<{
  recipe: FullRecipe;
  servings: number | undefined;
}> = props => {
  const classes = useStyles(props);
  const { recipe, servings } = props;

  const introValue = useMemo(
    () =>
      recipe.introduction && Value.fromJSON(JSON.parse(recipe.introduction)),
    [recipe.introduction],
  );

  const author = recipe.author;

  return (
    <Container>
      <RecipeImage recipe={recipe} className={classes.coverImage} />
      <Paper className={classes.paper}>
        <Typography variant="h1" gutterBottom>
          {recipe.title}
        </Typography>
        {recipe.description && (
          <Typography variant="body2" gutterBottom>
            {recipe.description}
          </Typography>
        )}
        {author && (
          <ButtonBase
            className={classes.authorButton}
            component={Link}
            to={`/users/${author.id}`}
          >
            <Avatar src={author.photoUrl} />
            <Typography className={classes.authorName}>
              {author.displayName}
            </Typography>
          </ButtonBase>
        )}
      </Paper>
      <div className={classes.center}>
        <Chip
          {...({ component: 'a', href: '#ingredients' } as any)}
          label="Jump to ingredients"
          clickable
        />
      </div>
      {introValue && (
        <Paper className={classes.paper}>
          <SlateEditor readOnly value={introValue} />
        </Paper>
      )}
      <Paper className={classes.paper} id="ingredients">
        <Typography variant="h3">Ingredients</Typography>
        <Typography variant="caption">
          Check off items as you prepare them for cooking
        </Typography>
        <RecipeIngredients recipe={recipe} servingsOverride={servings} />
      </Paper>
      <RecipeStepsLink recipe={recipe} />
    </Container>
  );
};
