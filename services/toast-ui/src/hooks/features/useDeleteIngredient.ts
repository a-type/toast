import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from '@apollo/react-hooks';

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

const RecipeFragment = gql`
  fragment DeleteIngredientRecipe on Recipe {
    ingredientsConnection {
      edges {
        node {
          id
        }
      }
    }
  }
`;

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
      const id = `Recipe:${result.data.deleteIngredient.recipe.id}`;

      const recipe = cache.readFragment<{
        ingredientsConnection: {
          edges: {
            node: {
              id: string;
            };
          }[];
        };
      }>({
        id,
        fragmentName: 'DeleteIngredientRecipe',
        fragment: RecipeFragment,
      });

      const edges = recipe.ingredientsConnection.edges.filter(
        ({ node }) => node.id !== result.data.deleteIngredient.ingredient.id,
      );

      cache.writeFragment({
        id,
        fragmentName: 'DeleteIngredientRecipe',
        fragment: RecipeFragment,
        data: {
          __typename: 'Recipe',
          ingredientsConnection: {
            __typename: 'RecipeIngredientsConnection',
            edges,
          },
        },
      });
    },
  });
