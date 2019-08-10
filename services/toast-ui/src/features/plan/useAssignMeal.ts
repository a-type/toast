import gql from 'graphql-tag';
import { PlanCookingEdgeFragment } from './usePlan';
import { PlanCookingEdge } from './types';
import { useMutation } from 'react-apollo-hooks';

const AssignRecipeMutation = gql`
  mutation AssignRecipe(
    $planDayId: ID!
    $recipeId: ID!
    $servings: Int!
    $mealName: String!
  ) {
    addPlanToCook(
      input: {
        planDayId: $planDayId
        recipeId: $recipeId
        servings: $servings
        mealName: $mealName
      }
    ) {
      id
      planCookingConnection {
        edges {
          ...PlanCookingEdgeFragment
        }
      }
    }
  }
  ${PlanCookingEdgeFragment}
`;

export type AssignRecipeMutationResult = {
  assignPlanMealRecipe: PlanCookingEdge;
};

export default (): ((vars: {
  planDayId: string;
  recipeId: string;
  servings: number;
  mealName: string;
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
