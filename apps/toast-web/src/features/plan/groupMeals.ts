import { PlanMeal } from 'generated/schema';

export interface BasicPlanMeal {
  id: string;
  dateIndex: number;
  mealIndex: number;
}

function groupMeals(meals: PlanMeal[]): PlanMeal[][];
function groupMeals<TMeal extends BasicPlanMeal>(meals: TMeal[]): TMeal[][];
function groupMeals<TMeal extends BasicPlanMeal>(meals: TMeal[]): TMeal[][] {
  const dateKeys = meals.reduce<Set<number>>((keys, meal) => {
    keys.add(meal.dateIndex);
    return keys;
  }, new Set());

  return Array.from(dateKeys).map<TMeal[]>(dateIndex =>
    meals
      .filter(meal => meal.dateIndex === dateIndex)
      .sort((a, b) => a.mealIndex - b.mealIndex),
  );
}

export default groupMeals;
