import React from 'react';
import { IsLoggedIn } from 'features/auth/gates';
import AnonLanding from './AnonLanding';
import { Redirect } from 'react-router-dom';
import Column from 'components/layout/Column';

export default () => (
  <IsLoggedIn
    fallback={
      <Column>
        <AnonLanding />
      </Column>
    }
  >
    <Redirect to="/plan" />
  </IsLoggedIn>
);
