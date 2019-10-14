import gql from 'graphql-tag';
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { useCallback } from 'react';
import { pathOr } from 'ramda';

export const FeedQuery = gql`
  query FeedQuery($first: Int, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        node {
          recipe {
            id
            title
            description
            coverImageUrl
            updatedAt
            attribution
            author {
              id
              displayName
              photoUrl
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export type FeedQueryResult = {
  feed: {
    edges: FeedEdge[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
};

export type FeedEdge = {
  node: {
    recipe: FeedRecipe;
  };
};

export type FeedRecipe = {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  updatedAt: number;
  attribution: string;
  author: {
    id: string;
    displayName: string;
    photoUrl: string;
  };
};

export type FeedQueryVariables = {
  first?: number;
  after?: string;
};

export const useFeed = (
  args: QueryHookOptions<FeedQueryResult, FeedQueryVariables> = {},
) => {
  const { fetchMore, ...rest } = useQuery<FeedQueryResult>(FeedQuery, args);

  const first = pathOr(10, ['variables', 'first'], args);
  const fetchNext = useCallback(() => {
    return fetchMore({
      variables: {
        first,
        after: rest.data.feed && rest.data.feed.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const { edges, pageInfo } = fetchMoreResult.feed;

        return edges.length
          ? {
              ...previousResult,
              feed: {
                edges: [...previousResult.feed.edges, ...edges],
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
    hasNextPage: pathOr(
      false,
      ['data', 'feed', 'pageInfo', 'hasNextPage'],
      rest,
    ) as boolean,
  };
};
