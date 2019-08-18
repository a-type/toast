import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'services/firebase';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Layout = styled<{}, 'div'>('div')`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  row-gap: var(--spacing-lg);

  & > * {
    margin: auto;
  }

  @media (min-width: 900px) {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;

    & > * {
      padding: var(--spacing-lg);
    }

    & > *:first-child {
      border-right: 2px solid var(--color-gray-lightest);
    }
  }
`;

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
        <Typography variant="h1">Log in or join for free</Typography>
        <Typography variant="body1">
          Sign up for Toast to start planning meals that fit your
          life&mdash;your schedule, your recipes, your taste.
        </Typography>
        <Typography variant="body1">
          Joining, planning, and collecting recipes is totally free. Time to get
          control of weeknight meals.
        </Typography>
      </div>
    </Layout>
  );
};

export default Login;