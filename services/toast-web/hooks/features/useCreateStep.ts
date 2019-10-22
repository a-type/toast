import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FullRecipeQueryResult, FullRecipeQuery } from './useFullRecipe';

export const CreateStepMutation = gql`
  mutation CreateStepMutation($input: CreateStepInput!) {
    createStep(input: $input) {
      stepEdge {
        node {
          id
          text
        }
      }
      recipe {
        id
      }
    }
  }
`;

export type CreateStepMutationResult = {
  createStep: {
    stepEdge: {
      node: {
        id: string;
        text: string;
      };
    };
    recipe: {
      id: string;
    };
  };
};

export type CreateStepMutationVariables = {
  input: {
    recipeId: string;
    text: string;
  };
};

export const useCreateStep = (args = {}) =>
  useMutation<CreateStepMutationResult, CreateStepMutationVariables>(
    CreateStepMutation,
    {
      ...args,
      update: async (cache, result) => {
        const id = result.data.createStep.recipe.id;

        const { recipe, ...restData } = cache.readQuery<FullRecipeQueryResult>({
          query: FullRecipeQuery,
          variables: {
            recipeId: id,
          },
        });

        const edges = [
          ...recipe.stepsConnection.edges,
          result.data.createStep.stepEdge,
        ];

        const newRecipe = {
          ...recipe,
          stepsConnection: {
            ...recipe.stepsConnection,
            edges,
          },
        };

        cache.writeQuery({
          query: FullRecipeQuery,
          variables: {
            recipeId: id,
          },
          data: {
            ...restData,
            recipe: newRecipe,
          },
        });
      },
    },
  );
