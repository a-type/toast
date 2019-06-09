import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Loader from 'components/generic/Loader';
import useStoredFlag from 'hooks/useStoredFlag';
import useGuides from 'features/guides/useGuides';
import { Typography, Button } from '@material-ui/core';

export const Document = gql`
  mutation CreatePlan {
    createGroup {
      id
    }
  }
`;

export const PlanSetup = ({ onCreated }: { onCreated: () => any }) => {
  const [showJoinInfo, setShowJoinInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const mutate = useMutation(Document);
  const [_, setTutorialFlag] = useStoredFlag('onboarding');
  const [__, { queueGuide }] = useGuides();

  const create = async () => {
    setLoading(true);
    await mutate();
    setLoading(false);
    setTutorialFlag(true);
    queueGuide('addRecipes');
    queueGuide('plan');
    onCreated();
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
            <Button color="primary" onClick={create}>
              Create my plan
            </Button>
            <Button onClick={() => setShowJoinInfo(true)}>
              Join someone else's plan
            </Button>
          </>
        )
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            To join someone else's plan, you need to ask them to create a magic
            link for you. Ask them to click the button in the menu and send the
            link it generates to you.
          </Typography>
          <Button onClick={() => setShowJoinInfo(false)}>
            Nevermind, I'll make my own plan
          </Button>
        </>
      )}
    </React.Fragment>
  );
};
