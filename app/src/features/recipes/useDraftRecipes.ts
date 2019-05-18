import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const DraftRecipeQuery = gql`
  query DraftRecipes($first: Int, $offset: Int) {
    me {
      id
      draftRecipes(first: $first, offset: $offset) {
        id
        title
        published
        coverImage {
          id
          url
        }
      }
    }
  }
`;

export type DraftRecipe = {
  id: string;
  title: string;
  published: string;
  coverImage?: {
    id: string;
    url: string;
  };
};

export type DraftRecipeQueryResult = {
  me: {
    id: string;
    draftRecipes: DraftRecipe[];
  };
};

export type Pagination = {
  first?: number;
  offset?: number;
};

export default (
  pagination: Pagination = { first: 10, offset: 0 },
): [
  DraftRecipe[],
  boolean,
  ApolloError,
  QueryHookResult<DraftRecipeQueryResult, Pagination>
] => {
  const result = useQuery<DraftRecipeQueryResult, Pagination>(
    DraftRecipeQuery,
    { variables: pagination },
  );

  const recipes = pathOr([], ['me', 'draftRecipes'], result.data);

  return [recipes, result.loading, result.error, result];
};
