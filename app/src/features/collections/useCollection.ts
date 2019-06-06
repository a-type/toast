import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { pathOr } from 'ramda';
import { ApolloError } from 'apollo-boost';

const CollectionQuery = gql`
  query Collection($input: RecipeCollectionGetInput!) {
    me {
      id
      group {
        id
        recipeCollection(input: $input) {
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

  const collection = pathOr(
    [],
    ['me', 'group', 'recipeCollection'],
    result.data,
  );

  return [collection, result.loading, result.error, result];
};
