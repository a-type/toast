import { PlanDayData } from './types';
import gql from 'graphql-tag';
import { useQuery, QueryHookResult } from 'react-apollo-hooks';
import { ApolloError } from 'apollo-boost';
import { pathOr } from 'ramda';

export const MealFragment = gql`
  fragment MealRecipeFragment on Recipe {
    id
    title
    attribution
    sourceUrl
    description
    coverImageUrl
  }

  fragment MealFragment on PlanDay {
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
        planDaysConnection {
          nodes {
            id
            date

            cookingConnection {
              edges {
                ...MealFragment
              }
            }
          }
        }
      }
    }
  }

  ${MealFragment}
`;

export type GetPlanQueryResult = {
  me: {
    id: string;
    group?: {
      id: string;
      planDaysConnection: {
        nodes: PlanDayData[];
      };
    };
  };
};

export default (): [
  PlanDayData[],
  boolean,
  ApolloError,
  QueryHookResult<GetPlanQueryResult, {}>
] => {
  const result = useQuery<GetPlanQueryResult>(GetPlanQuery);

  const planDays = pathOr(
    [],
    ['me', 'group', 'planDaysConnection', 'nodes'],
    result.data,
  ).sort((a, b) => a.date.localeCompare(b.date));

  return [planDays, result.loading, result.error, result];
};
