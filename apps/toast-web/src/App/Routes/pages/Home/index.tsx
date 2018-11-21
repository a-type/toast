import React from 'react';
import { SingleColumn } from 'components/layouts';
import { IsLoggedIn } from 'features/auth/gates';
import AnonLanding from './AnonLanding';
import { Redirect } from 'react-router-dom';

export default () => (
  <IsLoggedIn
    fallback={
      <SingleColumn>
        <AnonLanding />
      </SingleColumn>
    }
  >
    <Redirect to="/plan" />
  </IsLoggedIn>
);
