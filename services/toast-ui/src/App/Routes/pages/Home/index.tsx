import React from 'react';
import { IsLoggedIn } from 'features/auth/gates';
import AnonLanding from './AnonLanding';
import { Redirect } from 'react-router';

export default () => (
  <IsLoggedIn fallback={<AnonLanding />}>
    <Redirect to="/home" />
  </IsLoggedIn>
);
