import React from 'react';
import { Bubbles } from 'components/graphics';
import { H1, P, H2 } from 'components/typeset';
import { Background, Button } from 'components/generic';
import styled from 'styled-components';
import auth from 'services/auth';
import { Content } from 'components/layouts';

const FullScreenBubbles = styled(Bubbles)`
  height: 100%;
`;

export default () => (
  <React.Fragment>
    <Background backgroundKey="planAnonLanding">
      <FullScreenBubbles bubbleCount={8} />
    </Background>
    <Content mode="overlay">
      <H1>Bring order to your week</H1>
      <P>
        Join Toast and start planning your daily meals in advance the easy way.
      </P>
      <P>
        <Button.Positive onClick={() => auth.login()}>
          Join or Log In
        </Button.Positive>
      </P>
      <H2>All of the Internet's Recipes</H2>
      <P>
        Bring all your favorites. We make it easy to scan recipes from across
        the web and add them to your plan.
      </P>
      <H2>Instantly Fit Your Schedule with Toast Gold</H2>
      <P>
        Upgrade your plan to make planning even easier with an AI-driven
        schedule.
      </P>
    </Content>
  </React.Fragment>
);
