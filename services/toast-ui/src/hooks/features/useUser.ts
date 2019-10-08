import gql from 'graphql-tag';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { UserFragment, User } from './fragments';
import { useAuth } from 'contexts/AuthContext';

export const GetUserQuery = gql`
  query GetUserQuery($id: ID!) {
    user(input: { id: $id }) {
      id
      ...UserFragment
    }
  }

  ${UserFragment}
`;

export type GetUserQueryResult = {
  user: User;
};

export type GetUserQueryVariables = {
  id?: string;
};

export const useUser = (
  variables: GetUserQueryVariables = {},
  args: Omit<
    QueryHookOptions<GetUserQueryResult, GetUserQueryVariables>,
    'variables'
  > = {},
) => {
  const { user: authenticatedUser } = useAuth();

  const userId =
    variables.id || (authenticatedUser ? authenticatedUser.uid : null);

  return useQuery<GetUserQueryResult>(GetUserQuery, {
    ...args,
    variables: { id: userId },
    skip: args.skip || !userId,
  });
};
