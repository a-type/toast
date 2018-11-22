import React from 'react';
import { BackdropArt } from 'components/brand';
import { H1, P, H2 } from 'components/typeset';
import { Background, Button, Link } from 'components/generic';
import { Content } from 'components/layouts';
import CreatePlanButton from './CreatePlanButton';
import { withRouter } from 'react-router-dom';

export default withRouter(({ history }) => (
  <React.Fragment>
    <Background backgroundKey="planUserLanding">
      <BackdropArt />
    </Background>
    <Content mode="overlay">
      <H1>Let's get started</H1>
      <P>
        Thanks for joining Toast! Let's set you up with your new plan. This
        shouldn't take long.
      </P>
      <P>
        First off, are you looking to start your own plan, or join someone else?
      </P>
      <CreatePlanButton onCreate={() => history.push('/plan/edit')} />
    </Content>
  </React.Fragment>
));
