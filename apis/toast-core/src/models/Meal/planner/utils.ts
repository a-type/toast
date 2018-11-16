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
  startDateIndex: number,
  endDateIndex: number,
  findFirstMeal: (meal: ScheduleMeal) => boolean = findCookedMeal,
): Meal[] => {
  // skip breakfast for main planning
  // find first cook day after grocery day to use to initialize the week
  const firstCookMeal = mealsFromGroceryDay(schedule).find(findFirstMeal);

  if (!firstCookMeal) {
    throw new Error(
      "Sorry, we couldn't figure out where to start this plan based on your schedule.",
    );
  }

  const meals = new Array(1 + endDateIndex - startDateIndex)
    .fill(null)
    .map((_, dayIndex) =>
      new Array(MEALS_PER_DAY).fill(null).map((__, mealIndex) => {
        return Meal.createEmpty(startDateIndex + dayIndex, mealIndex);
      }),
    )
    .reduce((allMeals, dayMeals) => allMeals.concat(dayMeals), []);

  return meals;
};
