import * as React from 'react';
import Login from 'components/features/Login';
import { IsLoggedIn } from 'components/auth/IsLoggedIn';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { parse } from 'query-string';
import { Logo, BackdropArt } from 'components/brand';
import {
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
}));

export const LoginPage: React.SFC<RouteComponentProps> = ({ location }) => {
  const returnTo = (parse(location.search).r as string) || '/home';
  const classes = useStyles({});
  return (
    <IsLoggedIn
      fallback={
        <Grid container style={{ height: '100%' }}>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            {...({ elevation: 6, square: true } as any)}
            className={classes.section}
          >
            <Typography variant="h2" component="h1" paragraph>
              Log in or join
            </Typography>
            <Typography variant="body1" paragraph>
              Sign up for Toast to start planning meals that fit your
              life&mdash;your schedule, your recipes, your taste.
            </Typography>
            <Login returnTo={returnTo} />
          </Grid>
          <Grid item xs={false} sm={4} md={7} style={{ position: 'relative' }}>
            <BackdropArt />
          </Grid>
        </Grid>
      }
    >
      <Redirect to="/" />
    </IsLoggedIn>
  );
};
