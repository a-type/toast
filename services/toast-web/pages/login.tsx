import * as React from 'react';
import Login from 'components/auth/Login';
import BackdropArt from 'components/brand/BackdropArt';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useAuth } from 'contexts/AuthContext';

const useStyles = makeStyles(theme => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
}));

const LoginPage: React.SFC<{}> = () => {
  const router = useRouter();
  const returnTo = (router.query.r as string) || '/feed';
  const classes = useStyles({});

  const auth = useAuth();

  React.useEffect(() => {
    if (auth.isLoggedIn) {
      router.push(returnTo);
    }
  }, [auth]);

  return (
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
  );
};

export default LoginPage;
