import gql from 'graphql-tag';
import { MealFragment } from './usePlan';
import { PlanMealData } from './types';
import { useMutation } from 'react-apollo-hooks';

const AssignRecipeMutation = gql`
  mutation AssignRecipe($planMealId: ID!, $recipeId: ID!, $servings: Int!) {
    assignPlanMealRecipe(
      input: {
        planMealId: $planMealId
        recipeId: $recipeId
        servings: $servings
      }
    ) {
      id
      ...MealFragment
    }
  }
  ${MealFragment}
`;

export type AssignRecipeMutationResult = {
  assignPlanMealRecipe: PlanMealData;
};

export default (): ((vars: {
  planMealId: string;
  recipeId: string;
  servings: number;
}) => Promise<any>) => {
  const mutate = useMutation<AssignRecipeMutationResult>(AssignRecipeMutation);
  return ({ servings, ...rest }) =>
    mutate({
      variables: {
        ...rest,
        servings: Math.floor(servings),
      },
    });
};
