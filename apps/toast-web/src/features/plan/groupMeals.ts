import { PlanWeekMeal } from 'generated/schema';

export interface BasicPlanWeekMeal {
  id: string;
  dayIndex: number;
  mealIndex: number;
}

function groupMeals(meals: PlanWeekMeal[]): PlanWeekMeal[][];
function groupMeals<TMeal extends BasicPlanWeekMeal>(meals: TMeal[]): TMeal[][];
function groupMeals<TMeal extends BasicPlanWeekMeal>(
  meals: TMeal[],
): TMeal[][] {
  return meals.reduce<TMeal[][]>((byDay, meal) => {
    byDay[meal.dayIndex][meal.mealIndex] = meal;
    return byDay;
  }, new Array(7).fill(null).map(() => []));
}

export default groupMeals;
