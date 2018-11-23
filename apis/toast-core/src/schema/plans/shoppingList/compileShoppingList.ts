import { ShoppingList } from 'models';
import { MealActionCook } from 'models/Meal/Meal';
import { Context } from 'context';
import { isCookAction } from 'guards/planActions';

export default async (
  planId: string,
  startDateIndex: number,
  endDateIndex: number,
  ctx: Context,
) => {
  // collect all recipes
  const meals = await ctx.firestore.plans.getMealRange(
    planId,
    startDateIndex,
    endDateIndex,
  );
  const actions = meals.reduce((acc, meal) => acc.concat(meal.actions), []);
  const cookActions = actions.filter(isCookAction) as MealActionCook[];

  const recipeServings: { [id: string]: number } = cookActions.reduce<{
    [id: string]: number;
  }>((servings, action) => {
    if (!action.recipeId) {
      return servings;
    }

    if (servings[action.recipeId]) {
      return {
        ...servings,
        [action.recipeId]: servings[action.recipeId] + action.servings,
      };
    }

    return {
      ...servings,
      [action.recipeId]: action.servings,
    };
  }, {});

  const recipes = await ctx.graph.recipes.getAllWithIngredients(
    Object.keys(recipeServings),
  );

  const shoppingList = ShoppingList.createEmpty(startDateIndex, endDateIndex);

  recipes.forEach(recipe => {
    shoppingList.addRecipe(recipe, recipeServings[recipe.id]);
  });

  return shoppingList;
};
