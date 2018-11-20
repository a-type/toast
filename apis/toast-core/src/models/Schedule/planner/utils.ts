import { ScheduleMeal } from 'models/Schedule/Schedule';
import { Meal, Schedule } from 'models';

export const MEALS_PER_DAY = 3;
export const DAYS_PER_WEEK = 7;

export const initializeWeek = (): Meal[] => {
  const meals = new Array(DAYS_PER_WEEK)
    .fill(null)
    .map((_, dayIndex) =>
      new Array(MEALS_PER_DAY).fill(null).map((__, mealIndex) => {
        return Meal.createEmpty(dayIndex, mealIndex);
      }),
    )
    .reduce((allMeals, dayMeals) => allMeals.concat(dayMeals), []);

  return meals;
};
