import * as React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Loader } from 'components/Loader';
import { Button } from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import { useRouter } from 'next/router';

const JoinGroupMutation = gql`
  mutation AcceptGroupInvitation($key: String!) {
    acceptGroupInvitation(key: $key) {
      group {
        id
      }
    }
  }
`;

export interface JoinProps {
  invitationKey: string;
}

const JoinGroup: React.SFC<JoinProps> = ({ invitationKey }) => {
  const [mutate, { loading, error }] = useMutation(JoinGroupMutation, {
    variables: {
      key: invitationKey,
    },
  });

  const router = useRouter();

  const join = async () => {
    await mutate();
    router.push('/feed');
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Button variant="contained" color="primary" onClick={join}>
      Join the group
    </Button>
  );
};

export default JoinGroup;
