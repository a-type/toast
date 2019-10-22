import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from '@apollo/react-hooks';
import { FullRecipeQueryResult, FullRecipeQuery } from './useFullRecipe';

export const DeleteIngredientMutation = gql`
  mutation DeleteIngredientMutation($input: DeleteIngredientInput!) {
    deleteIngredient(input: $input) {
      ingredient {
        id
      }
      recipe {
        id
      }
    }
  }
`;

export type DeleteIngredientMutationResult = {
  deleteIngredient: {
    ingredient: {
      id: string;
    };
    recipe: {
      id: string;
    };
  };
};

export type DeleteIngredientMutationVariables = {
  input: {
    id: string;
  };
};

export const useDeleteIngredient = (
  args: MutationHookOptions<
    DeleteIngredientMutationResult,
    DeleteIngredientMutationVariables
  > = {},
) =>
  useMutation<
    DeleteIngredientMutationResult,
    DeleteIngredientMutationVariables
  >(DeleteIngredientMutation, {
    ...args,
    update: async (cache, result) => {
      const id = result.data.deleteIngredient.recipe.id;

      const { recipe } = cache.readQuery<FullRecipeQueryResult>({
        query: FullRecipeQuery,
        variables: {
          recipeId: id,
        },
      });

      const edges = recipe.ingredientsConnection.edges.filter(
        ({ node }) => node.id !== result.data.deleteIngredient.ingredient.id,
      );

      cache.writeQuery({
        query: FullRecipeQuery,
        variables: {
          recipeId: id,
        },
        data: {
          recipe: {
            ...recipe,
            ingredientsConnection: {
              ...recipe.ingredientsConnection,
              edges,
            },
          },
        },
      });
    },
  });
