import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FullRecipeQueryResult, FullRecipeQuery } from './useFullRecipe';

export const CreateIngredientMutation = gql`
  mutation CreateIngredientMutation($input: CreateIngredientInput!) {
    createIngredient(input: $input) {
      ingredientEdge {
        node {
          id
          text
          quantity
          unit
          quantityStart
          quantityEnd
          unitStart
          unitEnd
          foodStart
          foodEnd
          comments
          preparations
          food {
            id
            name
          }
        }
      }
      recipe {
        id
      }
    }
  }
`;

export type CreateIngredientMutationResult = {
  createIngredient: {
    ingredientEdge: {
      node: {
        id: string;
        text: string;
        quantity: number;
        unit: string;
        quantityStart: number;
        quantityEnd: number;
        unitStart: number;
        unitEnd: number;
        foodStart: number;
        foodEnd: number;
        comments: string[];
        preparations: string[];
        food: {
          id: string;
          name: string;
        };
      };
    };
    recipe: {
      id: string;
    };
  };
};

export type CreateIngredientMutationVariables = {
  input: {
    recipeId: string;
    text: string;
  };
};

export const useCreateIngredient = (args = {}) =>
  useMutation<
    CreateIngredientMutationResult,
    CreateIngredientMutationVariables
  >(CreateIngredientMutation, {
    ...args,
    update: async (cache, result) => {
      const id = result.data.createIngredient.recipe.id;

      const { recipe, ...restData } = cache.readQuery<FullRecipeQueryResult>({
        query: FullRecipeQuery,
        variables: {
          recipeId: id,
        },
      });

      const edges = [
        ...recipe.ingredientsConnection.edges,
        result.data.createIngredient.ingredientEdge,
      ];

      const newRecipe = {
        ...recipe,
        ingredientsConnection: {
          ...recipe.ingredientsConnection,
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
  });
