import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const UpdateFoodMutation = gql`
  mutation UpdateFoodMutation($input: FoodUpdateInput!) {
    updateFood(input: $input) {
      food {
        id
        name
        category
      }
    }
  }
`;

export type UpdateFoodMutationResult = {
  updateFood: {
    id: string;
    name: string;
    category: string;
  };
};

export const useUpdateFood = (args = {}) =>
  useMutation<UpdateFoodMutationResult>(UpdateFoodMutation, args);
