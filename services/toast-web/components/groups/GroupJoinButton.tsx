import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Loader } from 'components/generic/Loader';
import { Button } from '@material-ui/core';
import ErrorMessage from 'components/generic/ErrorMessage';

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

const JoinGroup: React.SFC<JoinProps & RouteComponentProps> = ({
  invitationKey,
  history,
}) => {
  const [mutate, { loading, error }] = useMutation(JoinGroupMutation, {
    variables: {
      key: invitationKey,
    },
  });

  const join = async () => {
    await mutate();
    history.push('/');
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

export default withRouter(JoinGroup);
