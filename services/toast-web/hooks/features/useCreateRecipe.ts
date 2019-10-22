import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const CreateRecipeMutation = gql`
  mutation CreateRecipeMutation($input: CreateRecipeInput!) {
    createRecipe(input: $input) {
      recipe {
        id
        title
        description
        servings
        cookTime
        prepTime
        unattendedTime
        private
        published
        createdAt
      }
    }
  }
`;

export type CreateRecipeMutationResult = {
  createRecipe: {
    recipe: {
      id: string;
      title: string;
      description: string;
      servings: number;
      cookTime: number;
      prepTime: number;
      unattendedTime: number;
      private: boolean;
      published: boolean;
      createdAt: string;
    };
  };
};

export type CreateRecipeMutationVariables = {
  input: {
    fields: {
      title: string;
      description?: string;
      servings?: number;
      cookTime?: number;
      prepTime?: number;
      unattendedTime?: number;
      private?: boolean;
    };
  };
};

export const useCreateRecipe = (args = {}) =>
  useMutation<CreateRecipeMutationResult, CreateRecipeMutationVariables>(
    CreateRecipeMutation,
    args,
  );
