import React from 'react';
import Link from 'components/generic/Link';
import {
  Typography,
  Button,
  Container,
  makeStyles,
  Paper,
  Box,
} from '@material-ui/core';
import { IsLoggedIn } from 'components/auth/IsLoggedIn';
import { Redirect } from 'react-router';
import { BackdropArt } from 'components/brand';

const useStyles = makeStyles(theme => ({
  emphasis: {
    color: theme.palette.primary.main,
    textShadow: `-1px -1px 0 ${theme.palette.text.primary}, -1px 1px 0 ${
      theme.palette.text.primary
    }, 1px -1px 0 ${theme.palette.text.primary}, 1px 1px 0 ${
      theme.palette.text.primary
    }, 3px 3px 0 ${theme.palette.text.primary}`,
  },
  tagline: {
    color: theme.palette.primary.contrastText,
    textShadow: `-1px -1px 0 ${theme.palette.primary.main}, -1px 1px 0 ${
      theme.palette.primary.main
    }, 1px -1px 0 ${theme.palette.primary.main}, 1px 1px 0 ${
      theme.palette.primary.main
    }`,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

export const LandingPage = () => {
  const classes = useStyles({});

  return (
    <>
      <IsLoggedIn>
        <Redirect to="/home" />
      </IsLoggedIn>
      <Container>
        <BackdropArt />
        <Typography
          className={classes.tagline}
          variant="h2"
          component="h1"
          gutterBottom
        >
          <span className={classes.emphasis}>Finally</span>, meal planning with{' '}
          <span className={classes.emphasis}>your recipes</span>
        </Typography>
        <Paper className={classes.paper}>
          <Typography variant="body1" paragraph>
            Join Toast and start planning your daily meals in advance the easy
            way.
          </Typography>
          <Box display="flex" flexDirection="row" mt={3} mb={3}>
            <Link to="/login?r=/">
              <Button variant="contained" color="primary" size="large">
                Join or log in
              </Button>
            </Link>
          </Box>
          <Typography variant="h4" component="h2" paragraph>
            All of the Internet's Recipes
          </Typography>
          <Typography variant="body1" paragraph>
            Bring all your favorites. We make it easy to scan recipes from
            across the web and add them to your plan.
          </Typography>
          <Typography variant="h4" component="h2" paragraph>
            Shopping Made Simple
          </Typography>
          <Typography variant="body1" paragraph>
            Every week we create a shopping list for you based on the recipes
            you've chosen.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};
