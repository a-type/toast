import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Loader from 'components/generic/Loader';
import useStoredFlag from 'hooks/useStoredFlag';
import useGuides from 'features/guides/useGuides';
import { Typography, Button, makeStyles, Paper } from '@material-ui/core';
import ErrorMessage from 'components/generic/ErrorMessage';

export const Document = gql`
  mutation CreatePlan {
    createGroup {
      id
    }
  }
`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

export const PlanSetup = ({ onCreated }: { onCreated: () => any }) => {
  const [showJoinInfo, setShowJoinInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const mutate = useMutation(Document);
  const [_, setTutorialFlag] = useStoredFlag('onboarding');
  const [__, { queueGuide }] = useGuides();
  const [error, setError] = useState(null);
  const classes = useStyles({});

  const create = async () => {
    setLoading(true);
    try {
      await mutate();
      setTutorialFlag(true);
      queueGuide('addRecipes');
      queueGuide('plan');
      onCreated();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h1">Let's get started</Typography>
      <Typography variant="body1">
        Thanks for joining Toast! Let's set you up with your new plan. This
        shouldn't take long.
      </Typography>
      <Typography variant="body1">
        First off, are you looking to start your own plan, or join someone else?
      </Typography>
      {!showJoinInfo ? (
        loading ? (
          <Loader />
        ) : (
          <>
            <Button
              color="primary"
              variant="contained"
              onClick={create}
              className={classes.button}
            >
              Create my plan
            </Button>
            <Button
              onClick={() => setShowJoinInfo(true)}
              className={classes.button}
            >
              Join someone else's plan
            </Button>
          </>
        )
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body1" gutterBottom>
            To join someone else's plan, you need to ask them to create a magic
            link for you. Ask them to click the Invite button in their settings
            menu and send the link it generates to you.
          </Typography>
          <Button
            onClick={() => setShowJoinInfo(false)}
            className={classes.button}
          >
            Nevermind, I'll make my own plan
          </Button>
        </Paper>
      )}
      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}
    </React.Fragment>
  );
};
