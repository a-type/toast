import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from '@apollo/react-hooks';

export const Unfollow = gql`
  mutation Unfollow($input: UnfollowInput!) {
    unfollow(input: $input) {
      user {
        id
        viewerFollowing
      }
    }
  }
`;

export type UnfollowResult = {
  unfollow: {
    user: {
      id: string;
      viewerFollowing: boolean;
    };
  };
};

export type UnfollowVariables = {
  input: {
    userId: string;
  };
};

export const useUnfollow = (
  args: MutationHookOptions<UnfollowResult, UnfollowVariables> = {},
) => useMutation<UnfollowResult, UnfollowVariables>(Unfollow, args);
