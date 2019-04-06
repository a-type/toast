import gql from 'graphql-tag';
import { MealFragment } from './usePlan';
import { PlanMealData } from './types';
import { useMutation } from 'react-apollo-hooks';

const AssignRecipeMutation = gql`
  mutation AssignRecipe($planMealId: ID!, $eatingPlanMealId: ID!) {
    assignPlanMealEating(
      input: { planMealId: $planMealId, eatingPlanMealId: $eatingPlanMealId }
    ) {
      id
      ...MealFragment
    }
  }
  ${MealFragment}
`;

export type AssignRecipeMutationResult = {
  assignPlanMealEating: PlanMealData;
};

export default (): ((vars: {
  planMealId: string;
  eatingPlanMealId: string;
}) => Promise<any>) => {
  const mutate = useMutation<AssignRecipeMutationResult>(AssignRecipeMutation);
  return vars => mutate({ variables: vars });
};
