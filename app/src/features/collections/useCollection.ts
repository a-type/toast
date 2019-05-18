import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const CollectionQuery = gql`
  query Collection($id: ID!, $firstRecipes: Int, $offsetRecipes: Int) {
    me {
      id
      group {
        id
        collection(id: $id) {
          id
          name
          recipes(first: $firstRecipes, offset: $offsetRecipes) {
            id
            title
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
  }
`;

export type CollectionRecipe = {
  id: string;
  title: string;
  coverImage?: {
    id: string;
    url: string;
  };
  author?: {
    id: string;
  };
};

export type Collection = {
  id: string;
  name: string;
  recipes: CollectionRecipe[];
};

export type CollectionQueryResult = {
  me: {
    id: string;
    group: {
      id: string;
      collection: Collection;
    };
  };
};

export type Pagination = {
  first?: number;
  offset?: number;
};

export default (
  id: string,
  pagination: Pagination = { first: 10, offset: 0 },
): [
  Collection,
  boolean,
  ApolloError,
  QueryHookResult<
    CollectionQueryResult,
    {
      id: string;
      firstRecipes: number;
      offsetRecipes: number;
    }
  >
] => {
  const result = useQuery<
    CollectionQueryResult,
    {
      id: string;
      firstRecipes: number;
      offsetRecipes: number;
    }
  >(CollectionQuery, {
    variables: {
      id,
      firstRecipes: pagination.first,
      offsetRecipes: pagination.offset,
    },
  });

  const collection = pathOr([], ['me', 'group', 'collection'], result.data);

  return [collection, result.loading, result.error, result];
};
