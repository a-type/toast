import { Plan, ShoppingList } from 'models';
import { PlanActionCook } from 'models/Plan';
import { addQuantities, subtractQuantities } from 'tools/quantities';
import { ShoppingListIngredientQuantities } from 'models/ShoppingList';

export default async (week: Plan, ctx) => {
  // collect all recipes
  const cookActions = week.getActionsOfType('COOK') as PlanActionCook[];
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
    .reduce<ShoppingListIngredientQuantities>(
      (ingredients, [id, info, recipe]) => {
        const multiplier = info.servings / recipe.servings;
        return recipe.ingredients.reduce((quantities, recipeIngredient) => {
          const ingredientId = recipeIngredient.ingredient.id;
          const existing = quantities[ingredientId];
          if (existing) {
            // convert to existing unit and add
            const existingQty = addQuantities(
              {
                value: existing.totalValue,
                unit: existing.unit,
              },
              {
                value: (recipeIngredient.value || 1) * multiplier,
                unit: recipeIngredient.unit,
              },
            );

            return {
              ...quantities,
              [ingredientId]: {
                ...existing,
                totalValue: existingQty.value,
              },
            };
          } else {
            return {
              ...quantities,
              [ingredientId]: {
                ingredientId: recipeIngredient.ingredient.id,
                unit: recipeIngredient.unit,
                totalValue: (recipeIngredient.value || 1) * multiplier,
                purchasedValue: 0,
              },
            };
          }
        }, ingredients);
      },
      {},
    );

  return new ShoppingList({
    id: week.id,
    weekIndex: week.weekIndex,
    ingredients: ingredientQuantities,
  });
};
