import React, { FC, useCallback } from 'react';
import {
  makeStyles,
  Theme,
  Container,
  TextField,
  Fab,
} from '@material-ui/core';
import path from 'ramda/es/path';
import { useUpdateViewer } from 'hooks/features/useUpdateViewer';
import { useRouter } from 'next/router';
import { Loader } from 'components/Loader';
import ErrorMessage from 'components/ErrorMessage';
import { BaseUserPage } from '../BaseUserPage';
import { Formik } from 'formik';
import { UploadableImage } from 'components/UploadableImage';
import { DoneTwoTone } from '@material-ui/icons';
import { useUser } from 'hooks/features/useUser';
import { User } from 'hooks/features/fragments';
import removeUndefined from 'utils/removeUndefined';

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
  const router = useRouter();

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
        router.push('/users/me');
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
