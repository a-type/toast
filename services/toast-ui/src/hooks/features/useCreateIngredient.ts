import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export const CreateIngredientMutation = gql`
  mutation CreateIngredientMutation($input: CreateIngredientInput!) {
    createIngredient(input: $input) {
      ingredient {
        id
        text
        quantity
        unit
        comments
        preparations
        food {
          id
          name
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
    ingredient: {
      id: string;
      text: string;
      quantity: number;
      unit: string;
      comments: string[];
      preparations: string[];
      food: {
        id: string;
        name: string;
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

const RecipeFragment = gql`
  fragment CreateIngredientRecipe on Recipe {
    ingredientsConnection {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export const useCreateIngredient = (args = {}) =>
  useMutation<
    CreateIngredientMutationResult,
    CreateIngredientMutationVariables
  >(CreateIngredientMutation, {
    ...args,
    update: async (cache, result) => {
      const id = `Recipe:${result.data.createIngredient.recipe.id}`;

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
        fragmentName: 'CreateIngredientRecipe',
        fragment: RecipeFragment,
      });

      console.info(recipe);

      const edges = [
        ...recipe.ingredientsConnection.edges,
        {
          __typename: 'RecipeIngredientEdge',
          node: result.data.createIngredient.ingredient,
        },
      ];

      console.info(edges);

      cache.writeFragment({
        id,
        fragmentName: 'CreateIngredientRecipe',
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
