import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'services/firebase';
import useRouter from 'use-react-router';

export interface LoginProps {
  returnTo?: string;
}

const Login: React.SFC<LoginProps> = ({ returnTo }) => {
  const { history } = useRouter();

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
            history.push(returnTo);
            return false;
          },
        },
      }}
      firebaseAuth={firebase.auth()}
    />
  );
};

export default Login;
