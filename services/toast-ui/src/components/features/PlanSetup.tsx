import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import ErrorMessage from 'components/generic/ErrorMessage';
import { Loader } from 'components/generic/Loader/Loader';
import { Row } from 'components/generic/Row';
import useGuides from 'hooks/features/useGuides';
import gql from 'graphql-tag';
import useStoredFlag from 'hooks/useStoredFlag';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

export const CreatePlanMutation = gql`
  mutation CreatePlan {
    createGroup {
      group {
        id
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  button: {},
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

export const PlanSetup = ({ onCreated }: { onCreated: () => any }) => {
  const [showJoinInfo, setShowJoinInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mutate] = useMutation(CreatePlanMutation);
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
      <Typography variant="h1" gutterBottom>
        Let's get started
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thanks for joining Toast! Let's set you up with your new plan. This
        shouldn't take long.
      </Typography>
      <Typography variant="body1" gutterBottom>
        First off, are you looking to start your own plan, or join someone else?
      </Typography>
      {!showJoinInfo ? (
        loading ? (
          <Loader />
        ) : (
          <Row mt={1}>
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
          </Row>
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
