import React, { FC, ReactElement, cloneElement, useCallback } from 'react';
import {
  makeStyles,
  Theme,
  Container,
  Avatar,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import { RouteComponentProps, Route, Switch } from 'react-router';
import { useAuth } from 'contexts/AuthContext';
import { useUser, GetUserQueryResult } from 'hooks/features/useUser';
import { Loader } from 'components/generic/Loader';
import { path } from 'ramda';
import ErrorMessage from 'components/generic/ErrorMessage';
import { AuthoredRecipes } from 'components/features/recipes/AuthoredRecipes';
import { RecipeGrid } from 'components/features/recipes/RecipeGrid';
import { Formik } from 'formik';
import { UploadableImage } from 'components/generic/UploadableImage';
import Link from 'components/generic/Link';
import { EditTwoTone, DoneTwoTone } from '@material-ui/icons';
import { useUpdateViewer } from 'hooks/features/useUpdateViewer';
import removeUndefined from 'utils/removeUndefined';
import useRouter from 'use-react-router';
import { Fab } from 'components/generic/Fab';

export interface UsersPageProps {}

export const UsersPage: FC<UsersPageProps> = props => {
  return (
    <Switch>
      <Route path="/users/me/edit" exact component={EditUserPage} />
      <Route path="/users/:userId" component={UserPage} />
    </Switch>
  );
};

export interface BaseUserPageProps {
  user: User;
  renderAvatar: (props: any) => ReactElement;
  renderDisplayName: (props: any) => ReactElement;
  renderBio: (props: any) => ReactElement;
  renderCoverImage: (props: any) => ReactElement;
  children: (props: any) => ReactElement;
}

type User = GetUserQueryResult['user'];

const useBaseUserPageStyles = makeStyles<Theme, BaseUserPageProps>(theme => ({
  coverImage: {
    width: '100%',
    height: '240px',
    backgroundColor: theme.palette.grey[200],
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '100%',
    position: 'absolute',
    top: '0',
    transform: 'translateY(-50%)',
    border: `6px solid ${theme.palette.background.paper}`,

    [theme.breakpoints.up('lg')]: {
      right: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
    paddingTop: `calc(${theme.spacing(2)}px + 60px)`,
    position: 'relative',
    display: 'grid',
    gridTemplateAreas: '"info" "content"',

    [theme.breakpoints.up('lg')]: {
      gridTemplateAreas: '"content info"',
      gridTemplateColumns: '2fr auto',
      paddingTop: theme.spacing(2),
    },
  },
  displayName: {
    fontSize: theme.typography.h2.fontSize,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      maxWidth: '260px',
    },
  },
  bio: {
    marginBottom: theme.spacing(3),
  },
  infoSection: {
    gridArea: 'info',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '400px',
    },
  },
  contentSection: {
    gridArea: 'content',
  },
}));

export const BaseUserPage: FC<BaseUserPageProps> = props => {
  const classes = useBaseUserPageStyles(props);
  const {
    user,
    renderAvatar,
    renderDisplayName,
    renderBio,
    renderCoverImage,
    children,
  } = props;

  if (!user) {
    return null;
  }

  return (
    <Container>
      {renderCoverImage({ className: classes.coverImage })}
      <Paper className={classes.paper}>
        <section className={classes.infoSection}>
          {renderAvatar({ className: classes.avatar })}
          {renderDisplayName({ className: classes.displayName })}
          {renderBio({ className: classes.bio })}
        </section>
        <section className={classes.contentSection}>{children({})}</section>
      </Paper>
    </Container>
  );
};

const useUserPageStyles = makeStyles<Theme, any>(theme => ({}));

export const UserPage: FC<RouteComponentProps<{ userId: string }>> = ({
  match: {
    params: { userId },
  },
}) => {
  const classes = useUserPageStyles({});

  const isMe = !userId || userId === 'me';

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
        <Typography variant="h2" gutterBottom {...props}>
          {user.displayName}
        </Typography>
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

const useEditUserPageStyles = makeStyles<Theme, any>(theme => ({}));

export const EditUserPage: FC<{}> = props => {
  const classes = useEditUserPageStyles({});
  const { data, loading, error } = useUser();

  const user = path(['user'], data) as User;

  const initialValues: {
    displayName: string;
    photo: File | string;
    coverImage: File | string;
    bio: string;
  } = {
    displayName: path(['displayName'], user),
    photo: path(['photoUrl'], user),
    coverImage: path(['coverImageUrl'], user),
    bio: path(['bio'], user),
  };

  const [updateUser] = useUpdateViewer();
  const { history } = useRouter();

  const onSubmit = useCallback(
    async (values: typeof initialValues, formik: any) => {
      try {
        formik.setSubmitting(true);
        const photo =
          typeof values.photo === 'string' ? undefined : values.photo;
        const coverImage =
          typeof values.coverImage === 'string' ? undefined : values.coverImage;
        await updateUser({
          variables: {
            input: removeUndefined({
              photo,
              coverImage,
              bio: values.bio,
              displayName: values.displayName,
            }),
          },
        });
        history.push('/users/me');
      } catch (err) {
        console.error(err);
      } finally {
        formik.setSubmitting(false);
      }
    },
    [updateUser],
  );

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (!user) {
    if (error) {
      console.error(error);
      return <ErrorMessage error={error} />;
    }

    return null; // FIXME
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, values, handleChange, handleBlur, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <BaseUserPage
            user={user}
            renderDisplayName={props => (
              <TextField
                name="displayName"
                value={values.displayName}
                onChange={handleChange}
                onBlur={handleBlur}
                {...props}
              />
            )}
            renderBio={props => (
              <TextField
                multiline
                fullWidth
                label="Bio"
                name="bio"
                placeholder="Write a short introduction"
                value={values.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                {...props}
              />
            )}
            renderAvatar={props => (
              <UploadableImage
                {...props}
                value={values.photo}
                onChange={file => setFieldValue('photo', file)}
              />
            )}
            renderCoverImage={props => (
              <UploadableImage
                {...props}
                value={values.coverImage}
                onChange={file => setFieldValue('coverImage', file)}
              />
            )}
          >
            {() => (
              <Fab type="submit">
                <DoneTwoTone />
              </Fab>
            )}
          </BaseUserPage>
        </form>
      )}
    </Formik>
  );
};
