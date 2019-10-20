import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'lib/firebase';
import { useRouter } from 'next/router';
import { useMergeUser } from 'hooks/features/useMergeUser';
import { useSnackbar } from 'notistack';

export interface LoginProps {
  returnTo?: string;
}

const Login: React.SFC<LoginProps> = ({ returnTo }) => {
  const router = useRouter();
  const [mergeUserMutation] = useMergeUser();
  const { enqueueSnackbar } = useSnackbar();

  if (typeof window === 'undefined') {
    // no server rendering
    return null;
  }

  return (
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: 'redirect',
        signInSuccessUrl: returnTo,
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: (result, redirectUrl) => {
            mergeUserMutation()
              .then(() => {
                router.push(returnTo);
              })
              .catch(err => {
                console.error(err);
                enqueueSnackbar('Error logging in, please try again.');
              });
            return false;
          },
        },
      }}
      firebaseAuth={firebase.auth()}
    />
  );
};

export default Login;
