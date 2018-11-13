import Schedule, { ScheduleMeal } from 'models/Schedule';
import { PlanWeekData } from '../types';

const MEALS_PER_DAY = 3;
const DAYS_PER_WEEK = 7;

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
  weekIndex: number,
  findFirstMeal: (meal: ScheduleMeal) => boolean = findCookedMeal,
) => {
  // skip breakfast for main planning
  // find first cook day after grocery day to use to initialize the week
  const firstCookMeal = mealsFromGroceryDay(schedule).find(findFirstMeal);

  if (!firstCookMeal) {
    throw new Error(
      "Sorry, we couldn't figure out where to start this plan based on your schedule.",
    );
  }

  const week: PlanWeekData = {
    id: `${schedule.id}_w_${weekIndex}`,
    weekIndex,
    mealsPerDay: MEALS_PER_DAY,
    startDay: firstCookMeal.dayIndex,
    startMeal: firstCookMeal.mealIndex,
    meals: new Array(MEALS_PER_DAY * DAYS_PER_WEEK)
      .fill(null)
      .map((_, idx) => ({
        id: `${schedule.id}_w_${weekIndex}_m_${idx}`,
        weekIndex,
        // offsets meal index according to the meal the week starts on
        mealIndex: (firstCookMeal.mealIndex + idx) % MEALS_PER_DAY,
        dayIndex: Math.floor(
          ((firstCookMeal.dayIndex * MEALS_PER_DAY +
            firstCookMeal.mealIndex +
            idx) /
            MEALS_PER_DAY) %
            DAYS_PER_WEEK,
        ),
        actions: [],
      })),
  };

  return week;
};
