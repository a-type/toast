import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const CollectionQuery = gql`
  query Collection($id: ID!) {
    me {
      id
      group {
        id
        collection(input: { id: $id }) {
          id
          name
          recipesConnection {
            nodes {
              id
              title
              coverImageUrl
              coverImageAttribution
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
  coverImageUrl: string;
  coverImageAttribution: string;
};

export type Collection = {
  id: string;
  name: string;
  recipesConnection: {
    nodes: CollectionRecipe[];
  };
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
      input: {
        id: string;
      };
    }
  >
] => {
  const result = useQuery<
    CollectionQueryResult,
    {
      input: {
        id: string;
      };
    }
  >(CollectionQuery, {
    variables: {
      input: {
        id,
      },
    },
  });

  const collection = pathOr([], ['me', 'group', 'collection'], result.data);

  return [collection, result.loading, result.error, result];
};
