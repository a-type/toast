import { PlanDayData } from './types';
import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { ApolloError } from 'apollo-boost';
import { pathOr } from 'ramda';

export const PlanDayCookingEdgeFragment = gql`
  fragment MealRecipeFragment on Recipe {
    id
    title
    attribution
    sourceUrl
    description
    coverImageUrl
  }

  fragment PlanDayCookingEdgeFragment on PlanDayCookingRecipeEdge {
    servings
    mealName
    node {
      ...MealRecipeFragment
    }
  }
`;

export const GetPlanQuery = gql`
  query GetPlanQuery {
    me {
      id
      group {
        id
        stripeSubscriptionId
        planDaysConnection {
          nodes {
            id
            date

            cookingConnection {
              edges {
                ...PlanDayCookingEdgeFragment
              }
            }
          }
        }
      }
    }
  }

  ${PlanDayCookingEdgeFragment}
`;

export type GetPlanGroup = {
  id: string;
  stripeSubscriptionId: string | null;
  planDaysConnection: {
    nodes: PlanDayData[];
  };
};

export type GetPlanQueryResult = {
  me: {
    id: string;
    group?: GetPlanGroup;
  };
};

export default () => {
  const result = useQuery<GetPlanQueryResult>(GetPlanQuery);

  return {
    ...result,
    data: pathOr(null, ['me', 'group'], result.data) as GetPlanGroup,
  };
};
