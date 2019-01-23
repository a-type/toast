import * as React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import gql from 'graphql-tag';
import { CreateGroupInvitation } from 'generated/schema';

export const Document = gql`
  mutation CreateGroupInvitation {
    createGroupInvitation
  }
`;

interface CreateGroupInvitationMutationProps {
  variables?: CreateGroupInvitation.Variables;
  skip?: boolean;
  children(
    mutateFn: MutationFn<
      CreateGroupInvitation.Mutation,
      CreateGroupInvitation.Variables
    >,
  ): React.ReactNode;
}

const CreateGroupInvitationMutation: React.SFC<
  CreateGroupInvitationMutationProps
> = props => (
  <Mutation<CreateGroupInvitation.Mutation, CreateGroupInvitation.Variables>
    mutation={Document}
    {...props}
  />
);

export default CreateGroupInvitationMutation;
