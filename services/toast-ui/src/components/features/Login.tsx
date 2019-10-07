import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'services/firebase';
import useRouter from 'use-react-router';
import { useMergeUser } from 'hooks/features/useMergeUser';
import { useSnackbar } from 'notistack';

export interface LoginProps {
  returnTo?: string;
}

const Login: React.SFC<LoginProps> = ({ returnTo }) => {
  const { history } = useRouter();
  const [mergeUserMutation] = useMergeUser();
  const { enqueueSnackbar } = useSnackbar();

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
                history.push(returnTo);
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
