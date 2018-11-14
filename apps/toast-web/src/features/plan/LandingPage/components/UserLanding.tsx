import React from 'react';
import { BackdropArt } from 'components/brand';
import { H1, P, H2 } from 'components/typeset';
import { Background, Button, Link } from 'components/generic';
import styled from 'styled-components';
import auth from 'services/auth';
import Content from './OverlayContent';

export default () => (
  <React.Fragment>
    <Background backgroundKey="planUserLanding">
      <BackdropArt />
    </Background>
    <Content mode="overlay">
      <H1>Bring order to your week</H1>
      <P>Start planning your daily meals in advance the easy way.</P>
      <P>
        <Link to="/plan/edit">
          <Button.Positive onClick={() => auth.login()}>
            Get started
          </Button.Positive>
        </Link>
      </P>
      <H2>All of the Internet's Recipes</H2>
      <P>
        Bring all your favorites. We make it easy to scan recipes from across
        the web and add them to your plan.
      </P>
      <H2>Instantly Fit Your Schedule with Toast Gold</H2>
      <P>
        Upgrade your account to make planning even easier with an AI-driven
        schedule.
      </P>
    </Content>
  </React.Fragment>
);
