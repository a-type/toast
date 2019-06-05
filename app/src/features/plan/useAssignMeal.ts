import gql from 'graphql-tag';
import { PlanDayCookingEdgeFragment } from './usePlan';
import { PlanMealData } from './types';
import { useMutation } from 'react-apollo-hooks';

const AssignRecipeMutation = gql`
  mutation AssignRecipe(
    $planDayId: ID!
    $recipeId: ID!
    $servings: Int!
    $mealName: String!
  ) {
    assignPlanDayCooking(
      input: {
        planDayId: $planDayId
        recipeId: $recipeId
        servings: $servings
        mealName: $mealName
      }
    ) {
      id
      cookingConnection {
        edges {
          ...PlanDayCookingEdgeFragment
        }
      }
    }
  }
  ${PlanDayCookingEdgeFragment}
`;

export type AssignRecipeMutationResult = {
  assignPlanMealRecipe: PlanMealData;
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
