import React from 'react';
import Link from 'components/generic/Link';
import { Logo } from 'components/brand';
import { Typography, Button, Container } from '@material-ui/core';

export default () => {
  return (
    <Container>
      <Logo
        pattern
        style={{ margin: 'auto auto var(--spacing-lg) 0' }}
        size="10vw"
      />
      <Typography variant="h1">Bring order to your week</Typography>
      <Typography variant="body1">
        Join Toast and start planning your daily meals in advance the easy way.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Link to="/login?r=/">
          <Button variant="contained" color="primary">
            Join or log in
          </Button>
        </Link>
      </Typography>
      <Typography variant="h2">All of the Internet's Recipes</Typography>
      <Typography variant="body1">
        Bring all your favorites. We make it easy to scan recipes from across
        the web and add them to your plan.
      </Typography>
      {/* <Typography level="2">Instantly Fit Your Schedule with Toast Gold</Typography>
      <Typography>
        Upgrade your account to make planning even easier with an AI-driven
        schedule.
      </Typography> */}
    </Container>
  );
};
