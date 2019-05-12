import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';

export type AcceptGroupInvitationVariables = {
  id: string;
};

export type AcceptGroupInvitationMutation = {
  acceptGroupInvitation?: {
    id: string;
  };
};

export const Document = gql`
  mutation AcceptGroupInvitation($id: String!) {
    acceptGroupInvitation(id: $id) {
      id
    }
  }
`;

interface AcceptGroupInvitationMutationProps {
  variables?: AcceptGroupInvitationVariables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<
      AcceptGroupInvitationMutation,
      AcceptGroupInvitationVariables
    >,
  ): React.ReactNode;
}

const AcceptGroupInvitationMutation: React.SFC<
  AcceptGroupInvitationMutationProps
> = props => (
  <Mutation<AcceptGroupInvitationMutation, AcceptGroupInvitationVariables>
    mutation={Document}
    {...props}
  />
);

export default AcceptGroupInvitationMutation;
