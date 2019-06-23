import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const CollectionsQuery = gql`
  query Collections {
    me {
      id
      group {
        id
        recipeCollectionsConnection {
          nodes {
            id
            name
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
  me: {
    id: string;
    group: {
      id: string;
      recipeCollectionsConnection: {
        nodes: Collection[];
      };
    };
  };
};

export type Pagination = {
  first?: number;
  offset?: number;
};

export default (
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
    ['me', 'group', 'recipeCollectionsConnection', 'nodes'],
    result.data,
  );

  return [collections, result.loading, result.error, result];
};
