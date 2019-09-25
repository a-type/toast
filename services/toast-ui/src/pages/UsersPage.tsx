import React, { FC } from 'react';
import {
  makeStyles,
  Theme,
  Container,
  Avatar,
  Typography,
  Paper,
} from '@material-ui/core';
import { RouteComponentProps, Route, Switch } from 'react-router';
import { useAuth } from 'contexts/AuthContext';
import { useUser, GetUserQueryResult } from 'hooks/features/useUser';
import { Loader } from 'components/generic/Loader';
import { path } from 'ramda';
import ErrorMessage from 'components/generic/ErrorMessage';
import { AuthoredRecipes } from 'components/features/recipes/AuthoredRecipes';
import { RecipeGrid } from 'components/features/recipes/RecipeGrid';

export interface UsersPageProps {}

export const UsersPage: FC<UsersPageProps> = props => {
  return (
    <Switch>
      <Route path="/users/:userId" component={UserPage} />
    </Switch>
  );
};

export interface UserPageProps
  extends RouteComponentProps<{ userId: string }> {}

const useStyles = makeStyles<Theme, UserPageProps>(theme => ({
  coverImage: {
    width: '100%',
    height: '240px',
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
  },
  avatar: {
    width: '120px',
    height: '120px',
    position: 'absolute',
    top: '0',
    transform: 'translateY(-50%)',
  },
  paper: {
    padding: theme.spacing(2),
    paddingTop: `calc(${theme.spacing(2)}px + 60px)`,
    position: 'relative',
  },
}));

export const UserPage: FC<UserPageProps> = props => {
  const classes = useStyles(props);
  const {
    match: {
      params: { userId },
    },
  } = props;

  const { data, loading, error } = useUser({
    id: userId === 'me' ? null : userId,
  });

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  const user = path(['user'], data) as GetUserQueryResult['user'];

  if (!user) {
    if (error) {
      console.error(error);
      return <ErrorMessage error={error} />;
    }

    return null; // FIXME
  }

  const recipes = (path(
    ['user', 'authoredRecipes', 'edges'],
    data,
  ) as GetUserQueryResult['user']['authoredRecipes']['edges'])
    .map(({ node }) => node)
    .filter(recipe => !!recipe.published);

  return (
    <Container>
      <div className={classes.coverImage} />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar} src={user.photoUrl} />
        <Typography variant="h2" gutterBottom>
          {user.displayName}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Recipes
        </Typography>
        <RecipeGrid recipes={recipes} />
      </Paper>
    </Container>
  );
};
