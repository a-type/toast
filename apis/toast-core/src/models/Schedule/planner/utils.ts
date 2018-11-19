import { ScheduleMeal } from 'models/Schedule/Schedule';
import { Meal, Schedule } from 'models';

export const MEALS_PER_DAY = 3;
export const DAYS_PER_WEEK = 7;

export const mealsFromGroceryDay = (schedule: Schedule): ScheduleMeal[] => {
  return [
    ...schedule.meals.slice(schedule.groceryDay * MEALS_PER_DAY),
    ...schedule.meals.slice(0, schedule.groceryDay * MEALS_PER_DAY),
  ];
};

const findCookedMeal = meal =>
  meal.mealIndex !== 0 &&
  ['LONG', 'MEDIUM', 'SHORT'].includes(meal.availability);

export const initializeWeek = (
  schedule: Schedule,
  findFirstMeal: (meal: ScheduleMeal) => boolean = findCookedMeal,
): Meal[] => {
  // skip breakfast for main planning
  // find first cook day after grocery day to use to initialize the week
  const fromGroceryDay = mealsFromGroceryDay(schedule);
  const firstCookMeal = fromGroceryDay.find(findFirstMeal) || fromGroceryDay[0];

  const meals = new Array(DAYS_PER_WEEK)
    .fill(null)
    .map((_, dayIndex) =>
      new Array(MEALS_PER_DAY).fill(null).map((__, baseMealIndex) => {
        const dateIndex = (dayIndex + firstCookMeal.dayIndex) % 7;
        const mealIndex = (baseMealIndex + firstCookMeal.mealIndex) % 3;

        return Meal.createEmpty(dateIndex, mealIndex);
      }),
    )
    .reduce((allMeals, dayMeals) => allMeals.concat(dayMeals), []);

  return meals;
};
