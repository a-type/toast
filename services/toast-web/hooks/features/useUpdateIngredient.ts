import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const UpdateIngredientQuery = gql`
  mutation UpdateIngredientQuery($input: UpdateIngredientInput!) {
    updateIngredient(input: $input) {
      ingredient {
        id
        text
        quantity
        unit
        food {
          id
          name
        }
      }
    }
  }
`;

export type UpdateIngredientQueryResult = {
  updateIngredient: {
    ingredient: {
      id: string;
      text: string;
      quantity: number;
      unit: string;
      food: {
        id: string;
        name: string;
      };
    };
  };
};

export type UpdateIngredientQueryVariables = {
  input: {
    id: string;
    text?: string;
    fields?: {
      text?: string;
      foodStart?: number;
      foodEnd?: number;
      unit: string;
      unitStart?: number;
      unitEnd?: number;
      quantity?: number;
      quantityStart?: number;
      quantityEnd?: number;
      comments?: string[];
      preparations?: string[];
    };
    foodId?: string;
  };
};

export const useUpdateIngredient = (args = {}) =>
  useMutation<UpdateIngredientQueryResult, UpdateIngredientQueryVariables>(
    UpdateIngredientQuery,
    args,
  );
