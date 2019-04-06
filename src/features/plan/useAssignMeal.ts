import gql from 'graphql-tag';
import { MealFragment } from './usePlan';
import { PlanMealData } from './types';
import { useMutation } from 'react-apollo-hooks';

const AssignRecipeMutation = gql`
  mutation AssignRecipe($planMealId: ID!, $recipeId: ID!) {
    assignPlanMealRecipe(
      input: { planMealId: $planMealId, recipeId: $recipeId }
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
}) => Promise<any>) => {
  const mutate = useMutation<AssignRecipeMutationResult>(AssignRecipeMutation);
  return vars => mutate({ variables: vars });
};
