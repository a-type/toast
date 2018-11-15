import { Schedule, PlanWeek } from 'models';
import { PlanActionType } from '../types';
import { initializeWeek } from './utils';

export default (schedule: Schedule, weekIndex: number): PlanWeek => {
  const week = new PlanWeek(initializeWeek(schedule, weekIndex, () => true));

  week.meals.forEach(meal => {
    const ScheduleMeal = schedule.getMeal(meal.dayIndex, meal.mealIndex);
    const mealType = {
      LONG: 'FANCY',
      MEDIUM: 'NORMAL',
      SHORT: 'QUICK',
    }[ScheduleMeal.availability];
    if (mealType) {
      const cookActionData = {
        type: PlanActionType.Cook,
        mealType,
        weekIndex,
        dayIndex: meal.dayIndex,
        mealIndex: meal.mealIndex,
        servings: schedule.defaultServings,
      };

      const cookAction = week.addAction(
        meal.dayIndex,
        meal.mealIndex,
        cookActionData,
      );

      const eatAction = {
        type: PlanActionType.Eat,
        weekIndex,
        dayIndex: meal.dayIndex,
        mealIndex: meal.mealIndex,
        cookActionId: cookAction.id,
        leftovers: false,
      };

      week.addAction(meal.dayIndex, meal.mealIndex, eatAction);
    } else {
      week.addAction(meal.dayIndex, meal.mealIndex, {
        weekIndex,
        dayIndex: meal.dayIndex,
        mealIndex: meal.mealIndex,
        type:
          ScheduleMeal.availability === 'EAT_OUT'
            ? PlanActionType.EatOut
            : PlanActionType.Skip,
      });
    }
  });

  return week;
};
