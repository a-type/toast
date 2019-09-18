import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const UpdateRecipeMutation = gql`
  mutation UpdateRecipeMutation($input: UpdateRecipeInput!) {
    updateRecipe(input: $input) {
      recipe {
        id
        title
        description
        introduction
        servings
        cookTime
        prepTime
        unattendedTime
        private
        published
        steps
      }
    }
  }
`;

export type UpdateRecipeMutationResult = {
  updateRecipe: {
    recipe: {
      id: string;
      title: string;
      introduction: string | null;
      description: string | null;
      servings: number;
      cookTime: number;
      prepTime: number;
      unattendedTime: number;
      private: boolean;
      published: boolean;
    };
  };
};

export type UpdateRecipeMutationVariables = {
  input: {
    id: string;
    fields?: {
      title?: string;
      introduction?: string;
      description?: string;
      servings?: number;
      prepTime?: number;
      cookTime?: number;
      unattendedTime?: number;
      private?: boolean;
      published?: boolean;
    };
    steps?: {
      set?: string[];
    };
  };
};

export const useUpdateRecipe = (args = {}) =>
  useMutation<UpdateRecipeMutationResult, UpdateRecipeMutationVariables>(
    UpdateRecipeMutation,
    args,
  );
