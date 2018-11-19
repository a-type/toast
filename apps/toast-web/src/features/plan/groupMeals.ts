import { PlanMeal } from 'generated/schema';

export interface BasicPlanMeal {
  id: string;
  dayIndex: number;
  mealIndex: number;
}

function groupMeals(meals: PlanMeal[], startDay?: number): PlanMeal[][];
function groupMeals<TMeal extends BasicPlanMeal>(
  meals: TMeal[],
  startDay?: number,
): TMeal[][];
function groupMeals<TMeal extends BasicPlanMeal>(
  meals: TMeal[],
  startDay: number = 0,
): TMeal[][] {
  return meals.reduce<TMeal[][]>((byDay, meal) => {
    byDay[(7 + meal.dayIndex - startDay) % 7][meal.mealIndex] = meal;
    return byDay;
  }, new Array(7).fill(null).map(() => []));
}

export default groupMeals;
