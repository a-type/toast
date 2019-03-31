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
    coverImage {
      id
      url
    }
  }

  fragment MealFragment on PlanMeal {
    id

    cooking {
      ...MealRecipeFragment
    }

    eating {
      id

      cooking {
        ...MealRecipeFragment
      }
    }
  }
`;

export const GetPlanQuery = gql`
  query GetPlanQuery {
    me {
      id
      group {
        id
        planDays {
          id
          date

          breakfast {
            ...MealFragment
          }
          lunch {
            ...MealFragment
          }
          dinner {
            ...MealFragment
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
      planDays: PlanDayData[];
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

  const planDays = pathOr([], ['me', 'group', 'planDays'], result.data).sort(
    (a, b) => a.date.localeCompare(b.date),
  );

  return [planDays, result.loading, result.error, result];
};
