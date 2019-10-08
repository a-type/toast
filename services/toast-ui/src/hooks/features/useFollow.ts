import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from '@apollo/react-hooks';

export const Follow = gql`
  mutation Follow($input: FollowInput!) {
    follow(input: $input) {
      user {
        id
        viewerFollowing
      }
    }
  }
`;

export type FollowResult = {
  follow: {
    user: {
      id: string;
      viewerFollowing: boolean;
    };
  };
};

export type FollowVariables = {
  input: {
    userId: string;
  };
};

export const useFollow = (
  args: MutationHookOptions<FollowResult, FollowVariables> = {},
) => useMutation<FollowResult, FollowVariables>(Follow, args);
