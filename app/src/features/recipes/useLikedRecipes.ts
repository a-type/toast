import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const LikedRecipesQuery = gql`
  query LikedRecipes($first: Int, $offset: Int) {
    me {
      id
      likedRecipes(first: $first, offset: $offset) {
        id
        title
        coverImage {
          id
          url
        }
      }
    }
  }
`;

export type LikedRecipe = {
  id: string;
  title: string;
  coverImage?: {
    id: string;
    url: string;
  };
};

export type LikedRecipesQueryResult = {
  me: {
    id: string;
    likedRecipes: LikedRecipe[];
  };
};

export type Pagination = {
  first?: number;
  offset?: number;
};

export default (
  pagination: Pagination = { first: 10, offset: 0 },
): [
  LikedRecipe[],
  boolean,
  ApolloError,
  QueryHookResult<LikedRecipesQueryResult, Pagination>
] => {
  const result = useQuery<LikedRecipesQueryResult, Pagination>(
    LikedRecipesQuery,
    { variables: pagination },
  );

  const recipes = pathOr([], ['me', 'likedRecipes'], result.data);

  return [recipes, result.loading, result.error, result];
};
