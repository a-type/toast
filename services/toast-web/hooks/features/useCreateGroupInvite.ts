import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CreateGroupInvitationMutation = gql`
  mutation CreateGroupInvitation {
    createGroupInvitation
  }
`;

export const useCreateGroupInvite = () =>
  useMutation<{ createGroupInvitation: string }>(CreateGroupInvitationMutation);
