import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { GetPlanQuery } from './usePlan';

export const RemovePlanMealMutation = gql`
  mutation RemovePlanMealMutation($input: RemovePlanMealInput!) {
    removePlanMeal(input: $input) {
      planMeal {
        id
      }
    }
  }
`;

export type RemovePlanMealInput = {
  id: string;
};

export type RemovePlanMealResult = {
  removePlanMeal: {
    planMeal: {
      id: string;
    };
  };
};

export const useRemovePlanMeal = () =>
  useMutation<RemovePlanMealResult, { input: RemovePlanMealInput }>(
    RemovePlanMealMutation,
    {
      refetchQueries: [
        {
          query: GetPlanQuery,
        },
      ],
    },
  );
