import React, { FC, useMemo } from 'react';
import {
  Container,
  Theme,
  Typography,
  Paper,
  Chip,
  Avatar,
  ButtonBase,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RecipeImage } from 'components/recipes/RecipeImage';
import useFullRecipe from 'hooks/features/useFullRecipe';
import ErrorMessage from 'components/ErrorMessage';
import { Loader } from 'components/Loader';
import { SlateEditor } from 'components/SlateEditor';
import { FullRecipe } from 'hooks/features/fragments';
import { Value } from 'slate';
import { RecipeIngredients } from 'components/recipes/RecipeIngredients';
import { RecipeStepsLink } from 'components/recipes/RecipeStepsLink';
import Link from 'components/Link';

export interface RecipeViewPageProps {
  recipeId: string;
  servings?: number;
}

const RecipeViewPage = (props: RecipeViewPageProps) => {
  const { recipeId, servings } = props;

  const { data, loading, error } = useFullRecipe(recipeId);

  if (error) {
    console.error(error);
    return <ErrorMessage error={error} />;
  }

  if (loading) {
    return <Loader />; // TODO
  }

  const recipe = data.recipe;

  return <RecipeViewPageContent recipe={recipe} servings={servings} />;
};

RecipeViewPage.getInitialProps = async ({ query }) => {
  const recipeId = query.recipeId;
  const servings = query.servings;

  const servingsValue = servings ? parseInt(servings as string, 10) : undefined;

  return { recipeId, servings: servingsValue };
};

export default RecipeViewPage;

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
    <Container itemScope itemType="https://schema.org/Recipe">
      <RecipeImage recipe={recipe} className={classes.coverImage} />
      <Paper className={classes.paper}>
        <Typography variant="h1" gutterBottom itemProp="name">
          {recipe.title}
        </Typography>
        {recipe.description && (
          <Typography variant="body2" gutterBottom itemProp="description">
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
            <Typography className={classes.authorName} itemProp="author">
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
          <SlateEditor readOnly value={introValue} itemProp="text" />
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
