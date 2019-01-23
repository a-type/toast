import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { AcceptGroupInvitation } from 'generated/schema';

export const Document = gql`
  mutation AcceptGroupInvitation($id: String!) {
    acceptGroupInvitation(id: $id) {
      id
    }
  }
`;

interface AcceptGroupInvitationMutationProps {
  variables?: AcceptGroupInvitation.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<
      AcceptGroupInvitation.Mutation,
      AcceptGroupInvitation.Variables
    >,
  ): React.ReactNode;
}

const AcceptGroupInvitationMutation: React.SFC<
  AcceptGroupInvitationMutationProps
> = props => (
  <Mutation<AcceptGroupInvitation.Mutation, AcceptGroupInvitation.Variables>
    mutation={Document}
    {...props}
  />
);

export default AcceptGroupInvitationMutation;
