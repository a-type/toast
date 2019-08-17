import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const JoinGroupMutation = gql`
  mutation AcceptGroupInvitation($id: String!) {
    acceptGroupInvitation(id: $id) {
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
  const [mutate] = useMutation(JoinGroupMutation, {
    variables: {
      id: invitationKey,
    },
  });

  React.useEffect(() => {
    (async () => {
      await mutate();
      history.push('/');
    })();
  }, [
    /* only on mount */
  ]);

  return <div>Joining the group...</div>;
};

export default withRouter(JoinGroup);
