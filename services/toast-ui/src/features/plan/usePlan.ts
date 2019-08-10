import { PlanMealRecipeData, PlanCookingEdge } from './types';
import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { ApolloError } from 'apollo-boost';
import { pathOr } from 'ramda';

export const PlanCookingEdgeFragment = gql`
  fragment MealRecipeFragment on Recipe {
    id
    title
    attribution
    sourceUrl
    description
    coverImageUrl
  }

  fragment PlanCookingEdgeFragment on GroupPlanCookingEdge {
    servings
    mealName
    node {
      ...MealRecipeFragment
    }
  }
`;

export const GetPlanQuery = gql`
  query GetPlanQuery {
    viewer {
      id
      group {
        id
        planCookingConnection {
          edges {
            ...PlanCookingEdgeFragment
          }
        }
      }
    }
  }

  ${PlanCookingEdgeFragment}
`;

export type GetPlanQueryResult = {
  viewer: {
    id: string;
    group?: {
      id: string;
      planCookingConnection: {
        edges: PlanCookingEdge[];
      };
    };
  };
};

export default (): [
  PlanCookingEdge[],
  boolean,
  ApolloError,
  QueryHookResult<GetPlanQueryResult, {}>
] => {
  const result = useQuery<GetPlanQueryResult>(GetPlanQuery);

  const planDays = pathOr(
    [],
    ['viewer', 'group', 'planCookingConnection', 'edges'],
    result.data,
  ).sort((a, b) => a.date.localeCompare(b.date));

  return [planDays, result.loading, result.error, result];
};
