import React from 'react';
import { BackdropArt } from 'components/brand';
import { Background } from 'components/generic';
import CreatePlanButton from './CreatePlanButton';
import { withRouter } from 'react-router-dom';
import { Heading, Paragraph } from 'grommet';

export default withRouter(({ history }) => (
  <React.Fragment>
    <Background backgroundKey="planUserLanding">
      <BackdropArt />
    </Background>
    <Heading>Let's get started</Heading>
    <Paragraph>
      Thanks for joining Toast! Let's set you up with your new plan. This
      shouldn't take long.
    </Paragraph>
    <Paragraph>
      First off, are you looking to start your own plan, or join someone else?
    </Paragraph>
    <CreatePlanButton onCreate={() => history.push('/plan/edit')} />
  </React.Fragment>
));
