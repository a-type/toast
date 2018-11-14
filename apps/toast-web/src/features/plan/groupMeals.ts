import { PlanWeekMeal } from 'generated/schema';

export interface BasicPlanWeekMeal {
  id: string;
  dayIndex: number;
  mealIndex: number;
}

function groupMeals(meals: PlanWeekMeal[], startDay?: number): PlanWeekMeal[][];
function groupMeals<TMeal extends BasicPlanWeekMeal>(
  meals: TMeal[],
  startDay?: number,
): TMeal[][];
function groupMeals<TMeal extends BasicPlanWeekMeal>(
  meals: TMeal[],
  startDay: number = 0,
): TMeal[][] {
  return meals.reduce<TMeal[][]>((byDay, meal) => {
    byDay[(7 + meal.dayIndex - startDay) % 7][meal.mealIndex] = meal;
    return byDay;
  }, new Array(7).fill(null).map(() => []));
}

export default groupMeals;
