import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'services/firebase';
import { Layout } from './components';
import { Paragraph } from 'grommet';
import { Heading } from 'components/text';

export interface LoginProps {
  returnTo?: string;
}

const Login: React.SFC<LoginProps> = ({ returnTo }) => {
  return (
    <Layout>
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
      <div>
        <Heading>Log in or join for free</Heading>
        <Paragraph>
          Sign up for Toast to start planning meals that fit your
          life&mdash;your schedule, your recipes, your taste.
        </Paragraph>
        <Paragraph>
          Joining, planning, and collecting recipes is totally free. Time to get
          control of weeknight meals.
        </Paragraph>
      </div>
    </Layout>
  );
};

export default Login;
