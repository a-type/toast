import gql from 'graphql-tag';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { FullRecipeFragment, FullRecipe } from './fragments';
import { useAuth } from 'contexts/AuthContext';

export const GetUserQuery = gql`
  query GetUserQuery($id: ID!) {
    user(input: { id: $id }) {
      id
      displayName
      photoUrl
      coverImageUrl
      bio

      authoredRecipes {
        edges {
          node {
            id
            ...FullRecipeFragment
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }

  ${FullRecipeFragment}
`;

export type GetUserQueryResult = {
  user: {
    id: string;
    displayName: string;
    photoUrl: string;
    coverImageUrl: string | null;
    bio: string | null;

    authoredRecipes: {
      edges: {
        node: FullRecipe;
      }[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
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
