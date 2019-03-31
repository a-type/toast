import React from 'react';
import { IsLoggedIn } from 'features/auth/gates';
import AnonLanding from './AnonLanding';
import StartPage from './StartPage';

export default () => (
  <IsLoggedIn fallback={<AnonLanding />}>
    <StartPage />
  </IsLoggedIn>
);
