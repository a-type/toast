import * as React from 'react';
import { AnonLanding, UserLanding } from './components';
import { IsLoggedIn } from 'features/auth/gates';

const LandingPage = () => (
  <IsLoggedIn fallback={<AnonLanding />}>
    <UserLanding />
  </IsLoggedIn>
);

export default LandingPage;
