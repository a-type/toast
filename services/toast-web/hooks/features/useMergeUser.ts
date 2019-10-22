import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from '@apollo/react-hooks';

export const MergeUserMutation = gql`
  mutation MergeUserMutation {
    mergeUser {
      id
    }
  }
`;

export type MergeUserMutationResult = {
  mergeUser: {
    id: string;
  };
};

export type MergeUserMutationVariables = {};

export const useMergeUser = (
  args: MutationHookOptions<
    MergeUserMutationResult,
    MergeUserMutationVariables
  > = {},
) =>
  useMutation<MergeUserMutationResult, MergeUserMutationVariables>(
    MergeUserMutation,
    args,
  );
