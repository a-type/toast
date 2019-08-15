import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { GetPlanQuery, GetPlanQueryResult } from './usePlan';

export const AddPlanMealMutation = gql`
  mutation AddPlanMealMutation($input: AddPlanMealInput!) {
    addPlanMeal(input: $input) {
      planMealEdge {
        cursor
        node {
          id
          date
          mealName
          servings
          note
        }
      }
    }
  }
`;

export type AddPlanMealInput = {
  date: number;
  mealName: string;
  recipeId?: string;
  servings?: number;
  note?: string;
};

export type AddPlanMealResult = {
  addPlanMeal: {
    planMealEdge: {
      cursor: string;
      node: AddPlanMealPlanMeal;
    };
  };
};

export type AddPlanMealPlanMeal = {
  id: string;
  date: number;
  mealName: string;
  note: string | null;
  servings: number | null;
};

export const useAddPlanMeal = () =>
  useMutation<AddPlanMealResult, { input: AddPlanMealInput }>(
    AddPlanMealMutation,
    {
      refetchQueries: [
        {
          query: GetPlanQuery,
        },
      ],
    },
  );
