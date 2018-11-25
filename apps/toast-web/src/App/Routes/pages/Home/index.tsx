import React from 'react';
import { SingleColumn, Content } from 'components/layouts';
import { IsLoggedIn } from 'features/auth/gates';
import AnonLanding from './AnonLanding';
import { Redirect } from 'react-router-dom';
import { Navigation } from 'features/structure';

export default () => (
  <IsLoggedIn
    fallback={
      <SingleColumn>
        <Navigation />
        <Content>
          <AnonLanding />
        </Content>
      </SingleColumn>
    }
  >
    <Redirect to="/plan" />
  </IsLoggedIn>
);
