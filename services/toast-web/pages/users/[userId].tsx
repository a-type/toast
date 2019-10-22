import React, { FC } from 'react';
import {
  Container,
  makeStyles,
  Theme,
  Box,
  Typography,
  Avatar,
} from '@material-ui/core';
import { Loader } from 'components/Loader';
import { useUser } from 'hooks/features/useUser';
import { useAuth } from 'contexts/AuthContext';
import { BaseUserPage } from './BaseUserPage';
import { User } from 'hooks/features/fragments';
import { path } from 'ramda';
import ErrorMessage from 'components/ErrorMessage';
import { FollowButton } from 'components/users/FollowButton';
import { EditTwoTone } from '@material-ui/icons';
import Link from 'components/Link';
import { RecipeGrid } from 'components/recipes/RecipeGrid';
import { Fab } from 'components/Fab';

const useUserPageStyles = makeStyles<Theme, any>(theme => ({}));

const UserPage = ({ userId }: { userId: string }) => {
  const classes = useUserPageStyles({});

  const { user: tokenUser } = useAuth();

  const isMe = !userId || (tokenUser && userId === tokenUser.uid);

  const { data, loading, error } = useUser({
    id: isMe ? null : userId,
  });

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  const user = path(['user'], data) as User;

  if (!user) {
    if (error) {
      console.error(error);
      return <ErrorMessage error={error} />;
    }

    return null; // FIXME
  }

  const recipes = (path(
    ['authoredRecipes', 'edges'],
    user,
  ) as User['authoredRecipes']['edges'])
    .map(({ node }) => node)
    .filter(recipe => !!recipe.published);

  return (
    <BaseUserPage
      renderDisplayName={props => (
        <Box mb={2}>
          <Typography variant="h2" gutterBottom {...props}>
            {user.displayName}
          </Typography>
          {!isMe && <FollowButton user={user} />}
        </Box>
      )}
      renderBio={props =>
        user.bio && (
          <Typography variant="body2" gutterBottom {...props}>
            {user.bio}
          </Typography>
        )
      }
      renderAvatar={props => <Avatar {...props} src={user.photoUrl} />}
      renderCoverImage={props => (
        <div
          {...props}
          style={{ backgroundImage: `url("${user.coverImageUrl}")` }}
        />
      )}
      user={user}
    >
      {() => (
        <>
          {isMe && (
            <Fab component={Link} to="/users/me/edit">
              <EditTwoTone />
            </Fab>
          )}
          <Typography variant="h4" gutterBottom>
            Recipes
          </Typography>
          <RecipeGrid recipes={recipes} />
        </>
      )}
    </BaseUserPage>
  );
};

UserPage.getInitialProps = async function(context) {
  return { userId: context.query.userId as string };
};

export default UserPage;
