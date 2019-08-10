import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const CollectionsQuery = gql`
  query Collections {
    viewer {
      id
      group {
        id
        recipeCollectionsConnection {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export type Collection = {
  id: string;
  name: string;
};

export type CollectionsQueryResult = {
  viewer: {
    id: string;
    group: {
      id: string;
      recipeCollectionsConnection: {
        edges: {
          node: Collection;
        }[];
      };
    };
  };
};

export type Pagination = {
  first?: number;
  offset?: number;
};

export const useCollections = (
  pagination: Pagination = { first: 10, offset: 0 },
): [
  Collection[],
  boolean,
  ApolloError,
  QueryHookResult<CollectionsQueryResult, Pagination>
] => {
  const result = useQuery<CollectionsQueryResult, Pagination>(
    CollectionsQuery,
    {
      variables: pagination,
    },
  );

  const collections = pathOr(
    [],
    ['viewer', 'group', 'recipeCollectionsConnection', 'edges'],
    result.data,
  ).map(({ node }) => node);

  return [collections, result.loading, result.error, result];
};
