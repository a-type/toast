import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from '@apollo/react-hooks';

export const UpdateViewerMutation = gql`
  mutation UpdateViewerMutation($input: UpdateUserInput!) {
    updateViewer(input: $input) {
      user {
        id
        displayName
        photoUrl
        coverImageUrl
        bio
      }
    }
  }
`;

export type UpdateUserMutationResult = {
  updateViewer: {
    user: {
      id: string;
      displayName: string;
      photoUrl: string;
      coverImageUrl: string | null;
      bio: string | null;
    };
  };
};

export type UpdateUserMutationVariables = {
  input: {
    displayName?: string;
    photo?: File;
    coverImage?: File;
    bio?: string;
  };
};

export const useUpdateViewer = (
  args: MutationHookOptions<
    UpdateUserMutationResult,
    UpdateUserMutationVariables
  > = {},
) =>
  useMutation<UpdateUserMutationResult, UpdateUserMutationVariables>(
    UpdateViewerMutation,
    args,
  );
