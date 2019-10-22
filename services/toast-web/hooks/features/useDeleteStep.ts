import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from '@apollo/react-hooks';
import { FullRecipeQueryResult, FullRecipeQuery } from './useFullRecipe';

export const DeleteStepMutation = gql`
  mutation DeleteStepMutation($input: DeleteStepInput!) {
    deleteStep(input: $input) {
      step {
        id
      }
      recipe {
        id
      }
    }
  }
`;

export type DeleteStepMutationResult = {
  deleteStep: {
    step: {
      id: string;
    };
    recipe: {
      id: string;
    };
  };
};

export type DeleteStepMutationVariables = {
  input: {
    id: string;
  };
};

export const useDeleteStep = (
  args: MutationHookOptions<
    DeleteStepMutationResult,
    DeleteStepMutationVariables
  > = {},
) =>
  useMutation<DeleteStepMutationResult, DeleteStepMutationVariables>(
    DeleteStepMutation,
    {
      ...args,
      update: async (cache, result) => {
        const id = result.data.deleteStep.recipe.id;

        const { recipe } = cache.readQuery<FullRecipeQueryResult>({
          query: FullRecipeQuery,
          variables: {
            recipeId: id,
          },
        });

        const edges = recipe.stepsConnection.edges.filter(
          ({ node }) => node.id !== result.data.deleteStep.step.id,
        );

        cache.writeQuery({
          query: FullRecipeQuery,
          variables: {
            recipeId: id,
          },
          data: {
            recipe: {
              ...recipe,
              stepsConnection: {
                ...recipe.stepsConnection,
                edges,
              },
            },
          },
        });
      },
    },
  );
