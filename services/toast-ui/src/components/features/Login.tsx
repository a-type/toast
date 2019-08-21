import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'services/firebase';

export interface LoginProps {
  returnTo?: string;
}

const Login: React.SFC<LoginProps> = ({ returnTo }) => {
  return (
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: 'redirect',
        signInSuccessUrl: returnTo,
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      }}
      firebaseAuth={firebase.auth()}
    />
  );
};

export default Login;
