import gql from 'graphql-tag';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { FullRecipeFragment, FullRecipe } from './fragments';

export const AuthoredRecipesQuery = gql`
  query AuthoredRecipesQuery {
    viewer {
      id
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

export type AuthoredRecipesQueryResult = {
  viewer: {
    id: string;
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

export type AuthoredRecipesQueryVariables = {};

export const useAuthoredRecipes = (
  args: QueryHookOptions<
    AuthoredRecipesQueryResult,
    AuthoredRecipesQueryVariables
  > = {},
) => useQuery<AuthoredRecipesQueryResult>(AuthoredRecipesQuery, args);
