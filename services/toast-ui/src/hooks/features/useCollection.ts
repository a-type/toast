import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useCallback } from 'react';
import { path } from 'ramda';

const CollectionQuery = gql`
  query Collection(
    $input: RecipeCollectionGetInput!
    $first: Int = 20
    $after: String
  ) {
    viewer {
      id
      group {
        id
        recipeCollection(input: $input) {
          id
          name
          recipesConnection(first: $first, after: $after) {
            edges {
              node {
                id
                title
                attribution
                coverImageUrl
                coverImageAttribution
                servings
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    }
  }
`;

export type RecipeCollectionRecipe = {
  id: string;
  title: string;
  attribution: string;
  coverImageUrl: string;
  coverImageAttribution: string;
  servings: number;
};

export type RecipeCollection = {
  id: string;
  name: string;
  recipesConnection: {
    edges: {
      node: RecipeCollectionRecipe;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
};

export type CollectionQueryResult = {
  viewer: {
    id: string;
    group: {
      id: string;
      recipeCollection: RecipeCollection;
    };
  };
};

export type Pagination = {
  first?: number;
  offset?: number;
};

export default (id: string, options: { first?: number } = {}) => {
  const { fetchMore, ...rest } = useQuery<
    CollectionQueryResult,
    {
      input: {
        id: string;
      };
      first: number | undefined;
      after: string | undefined;
    }
  >(CollectionQuery, {
    variables: {
      input: {
        id,
      },
      first: options.first,
      after: undefined,
    },
  });

  const fetchNext = useCallback(
    () =>
      fetchMore({
        variables: {
          first: options.first,
          after:
            rest.data &&
            rest.data.viewer.group &&
            rest.data.viewer.group.recipeCollection.recipesConnection.pageInfo
              .endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const {
            edges,
            pageInfo,
          } = fetchMoreResult.viewer.group.recipeCollection.recipesConnection;
          return edges.length
            ? {
                ...previousResult,
                viewer: {
                  ...previousResult.viewer,
                  group: {
                    ...previousResult.viewer.group,
                    recipeCollection: {
                      ...previousResult.viewer.group.recipeCollection,
                      recipesConnection: {
                        ...previousResult.viewer.group.recipeCollection
                          .recipesConnection,
                        edges: [
                          ...previousResult.viewer.group.recipeCollection
                            .recipesConnection.edges,
                          ...edges,
                        ],
                        pageInfo,
                      },
                    },
                  },
                },
              }
            : previousResult;
        },
      }),
    [options.first, fetchMore],
  );

  return {
    ...rest,
    fetchMore: fetchNext,
    hasNextPage: path(
      [
        'data',
        'viewer',
        'group',
        'recipeCollection',
        'recipesConnection',
        'pageInfo',
        'hasNextPage',
      ],
      rest,
    ) as boolean,
  };
};
