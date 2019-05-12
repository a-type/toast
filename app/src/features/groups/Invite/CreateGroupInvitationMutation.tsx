import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';

export type CreateGroupInvitationMutation = {
  createGroupInvitation: string;
};

export type CreateGroupInvitationVariables = {};

export const Document = gql`
  mutation CreateGroupInvitation {
    createGroupInvitation
  }
`;

interface CreateGroupInvitationMutationProps {
  variables?: CreateGroupInvitationVariables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<
      CreateGroupInvitationMutation,
      CreateGroupInvitationVariables
    >,
  ): React.ReactNode;
}

const CreateGroupInvitationMutation: React.SFC<
  CreateGroupInvitationMutationProps
> = props => (
  <Mutation<CreateGroupInvitationMutation, CreateGroupInvitationVariables>
    mutation={Document}
    {...props}
  />
);

export default CreateGroupInvitationMutation;
