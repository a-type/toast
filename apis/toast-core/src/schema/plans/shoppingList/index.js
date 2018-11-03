import { gql } from 'apollo-server-express';
import { UserInputError } from 'errors';
import qty from 'js-quantities';

export const typeDefs = gql`
  type ShoppingListIngredient {
    ingredient: Ingredient!
    totalValue: Float!
    unit: String
    recipes: [Recipe!]!
  }

  type ShoppingList {
    ingredients: [ShoppingListIngredient!]!
  }

  extend type Plan {
    shoppingList: ShoppingList
  }
`;

export const resolvers = {
  Plan: {
    shoppingList: async (parent, args, ctx) => {
      if (!parent.weekIndex) {
        throw new UserInputError(
          "You can't get a shopping list from the blueprint plan",
        );
      }

      // collect all recipes
      const cookActions = parent.getActionsOfType('COOK');
      const recipeMap = cookActions.reduce((recipes, action) => {
        if (!action.recipeId) {
          return recipes;
        }

        if (recipes[action.recipeId]) {
          return {
            ...recipes,
            [action.recipeId]: {
              servings: recipes[action.recipeId].servings + action.servings,
            },
          };
        }

        return {
          ...recipes,
          [action.recipeId]: {
            servings: action.servings,
          },
        };
      }, {});

      const recipes = await ctx.graph.recipes.getAllWithIngredients(
        Object.keys(recipeMap),
      );

      // multiply by servings and combine ingredients
      // note: this relies on recipeMap / recipe indexing to be stable... maybe not wise?
      const ingredientQuantities = Object.keys(recipeMap)
        .map((id, idx) => [id, recipeMap[id], recipes[idx]])
        .reduce((ingredients, [id, info, recipe]) => {
          const multiplier = info.servings / recipe.servings;
          return recipe.ingredients.reduce((quantities, recipeIngredient) => {
            const existing = quantities[recipeIngredient.ingredient.id];
            if (existing) {
              // convert to existing unit and add
              const existingQty = qty(existing.totalValue, existing.unit);
              const addedQty = qty(
                (recipeIngredient.value || 1) * multiplier,
                recipeIngredient.unit,
              );
              existingQty.add(addedQty);

              existing.recipes.add(recipe);

              return {
                ...quantities,
                [recipeIngredient.ingredient.id]: {
                  ...existing,
                  totalValue: existingQty.scalar,
                },
              };
            } else {
              return {
                ...quantities,
                [recipeIngredient.ingredient.id]: {
                  ingredient: recipeIngredient.ingredient,
                  unit: recipeIngredient.unit,
                  totalValue: (recipeIngredient.value || 1) * multiplier,
                  recipes: new Set([recipe]),
                },
              };
            }
          }, ingredients);
        }, {});

      const ingredientList = Object.keys(ingredientQuantities).map(id => ({
        ingredientId: id,
        ...ingredientQuantities[id],
      }));

      return {
        ingredients: ingredientList,
      };
    },
  },

  ShoppingListIngredient: {
    ingredient: (parent, _args, ctx) => {
      if (parent.ingredient) {
        return parent.ingredient;
      }

      return ctx.graph.ingredients.get(parent.ingredientId);
    },

    // recipes: (parent, _args, _ctx) => {
    //   if (parent.recipes instanceof Set) {
    //     const recipes = Array.from(parent.recipes);
    //     console.dir(recipes);
    //     return recipes;
    //   }

    //   return parent.recipes;
    // },
  },
};
