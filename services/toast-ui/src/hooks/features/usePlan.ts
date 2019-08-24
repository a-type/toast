import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useCallback } from 'react';
import { path } from 'ramda';

export const GroupPlanMealsEdgeFragment = gql`
  fragment MealRecipeFragment on Recipe {
    id
    title
    attribution
    sourceUrl
    coverImageUrl
  }

  fragment GroupPlanMealsEdgeFragment on GroupPlanMealsEdge {
    cursor
    node {
      id
      date
      mealName
      servings
      note
      cooking {
        ...MealRecipeFragment
      }
    }
  }
`;

export const GetPlanQuery = gql`
  query GetPlanQuery(
    $first: Int
    $after: String
    $filter: GroupPlanMealsFilterInput
  ) {
    viewer {
      id
      group {
        id
        planMealsConnection(filter: $filter, first: $first, after: $after) {
          edges {
            ...GroupPlanMealsEdgeFragment
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }

  ${GroupPlanMealsEdgeFragment}
`;

export type GetPlanQueryResult = {
  viewer: {
    id: string;
    group?: {
      id: string;
      planMealsConnection: {
        edges: GroupPlanMealEdge[];
        pageInfo: {
          endCursor: string | null;
          hasNextPage: boolean;
        };
      };
    };
  };
};

export type GroupPlanMealEdge = {
  node: PlanMeal;
};

export type PlanMeal = {
  id: string;
  date: string;
  mealName: string;
  note: string | null;
  cooking: PlanRecipe | null;
};

export type PlanRecipe = {
  id: string;
  title: string;
  attribution: string | null;
  sourceUrl: string | null;
  coverImageUrl: string;
};

export type GetPlanFilter = {
  dateBefore?: Date;
  dateAfter?: Date;
};

const processFilters = (filter: GetPlanFilter) => ({
  dateBefore: filter.dateBefore && filter.dateBefore.getTime(),
  dateAfter: filter.dateAfter && filter.dateAfter.getTime(),
});

export default ({
  filter,
  first,
  after,
}: {
  filter?: GetPlanFilter;
  first?: number;
  after?: string;
} = {}) => {
  const { fetchMore, ...rest } = useQuery<
    GetPlanQueryResult,
    {
      filter?: {
        dateBefore?: number;
        dateAfter?: number;
      };
      first?: number;
      after?: string;
    }
  >(GetPlanQuery, {
    // fetchPolicy: 'cache-and-network',
    // returnPartialData: true,
    variables: {
      filter: processFilters(filter),
      first,
      after,
    },
  });

  const fetchNext = useCallback(() => {
    console.log(`Fetching next page of plan...`);
    return fetchMore({
      variables: {
        first,
        filter: processFilters(filter),
        after:
          rest.data.viewer.group &&
          rest.data.viewer.group.planMealsConnection.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const {
          edges,
          pageInfo,
        } = fetchMoreResult.viewer.group.planMealsConnection;
        return edges.length
          ? {
              ...previousResult,
              viewer: {
                ...previousResult.viewer,
                group: {
                  ...previousResult.viewer.group,
                  planMealsConnection: {
                    ...previousResult.viewer.group.planMealsConnection,
                    edges: [
                      ...previousResult.viewer.group.planMealsConnection.edges,
                      ...edges,
                    ],
                    pageInfo,
                  },
                },
              },
            }
          : previousResult;
      },
    });
  }, [first, filter, fetchMore]);

  return {
    ...rest,
    fetchMore: fetchNext,
    hasNextPage: path(
      [
        'data',
        'viewer',
        'group',
        'planMealsConnection',
        'pageInfo',
        'hasNextPage',
      ],
      rest,
    ) as boolean,
  };
};
