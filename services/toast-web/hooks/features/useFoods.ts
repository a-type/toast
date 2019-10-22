import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useCallback } from 'react';
import { path } from 'ramda';

export const GetFoodsQuery = gql`
  query GetFoodsQuery($first: Int = 50, $after: String) {
    foods(first: $first, after: $after) {
      edges {
        node {
          id
          name
          category
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export type GetFoodsQueryResult = {
  foods: {
    edges: {
      node: ManageFoodsFood;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
};

export type ManageFoodsFood = {
  id: string;
  name: string;
  category: string;
};

export const useFoods = ({
  first,
  after,
}: {
  first?: number;
  after?: string;
} = {}) => {
  const { fetchMore, ...rest } = useQuery<GetFoodsQueryResult>(GetFoodsQuery, {
    variables: { first, after },
  });

  const fetchNext = useCallback(() => {
    return fetchMore({
      variables: {
        first,
        after: rest.data.foods.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { edges, pageInfo } = fetchMoreResult.foods;

        return edges.length
          ? {
              ...previousResult,
              foods: {
                ...previousResult.foods,
                edges: [...(previousResult.foods.edges || []), ...edges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });
  }, [first, fetchMore]);

  return {
    ...rest,
    fetchMore: fetchNext,
    hasNextPage: path(
      ['data', 'foods', 'pageInfo', 'hasNextPage'],
      rest,
    ) as boolean,
  };
};
