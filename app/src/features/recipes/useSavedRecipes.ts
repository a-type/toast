import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const SavedRecipeQuery = gql`
  query SavedRecipes($first: Int, $offset: Int) {
    me {
      id
      savedRecipes(first: $first, offset: $offset) {
        collection
        recipe {
          id
          title
          published
          coverImage {
            id
            url
          }
          author {
            id
          }
        }
      }
    }
  }
`;

export type SavedRecipeEdge = {
  collection: string;
  recipe: {
    id: string;
    title: string;
    published: string;
    coverImage?: {
      id: string;
      url: string;
    };
  };
};

export type SavedRecipeQueryResult = {
  me: {
    id: string;
    likedRecipes: SavedRecipeEdge[];
  };
};

export type Pagination = {
  first?: number;
  offset?: number;
};

export default (
  pagination: Pagination = { first: 10, offset: 0 },
): [
  SavedRecipeEdge[],
  boolean,
  ApolloError,
  QueryHookResult<SavedRecipeQueryResult, Pagination>
] => {
  const result = useQuery<SavedRecipeQueryResult, Pagination>(
    SavedRecipeQuery,
    { variables: pagination },
  );

  const recipes = pathOr([], ['me', 'savedRecipes'], result.data);

  return [recipes, result.loading, result.error, result];
};
