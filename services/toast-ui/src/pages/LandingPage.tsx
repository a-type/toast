import React from 'react';
import Link from 'components/generic/Link';
import { Typography, Button, Container } from '@material-ui/core';
import { IsLoggedIn } from 'components/auth/IsLoggedIn';
import { Redirect } from 'react-router';

export const LandingPage = () => {
  return (
    <>
      <IsLoggedIn>
        <Redirect to="/home" />
      </IsLoggedIn>
      <Container>
        <Typography variant="h1" gutterBottom>
          Bring order to your week
        </Typography>
        <Typography variant="body1" gutterBottom>
          Join Toast and start planning your daily meals in advance the easy
          way.
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Link to="/login?r=/">
            <Button variant="contained" color="primary">
              Join or log in
            </Button>
          </Link>
        </Typography>
        <Typography variant="h2" gutterBottom>
          All of the Internet's Recipes
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bring all your favorites. We make it easy to scan recipes from across
          the web and add them to your plan.
        </Typography>
      </Container>
    </>
  );
};
