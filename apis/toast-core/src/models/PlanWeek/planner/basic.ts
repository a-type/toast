import { Schedule, PlanWeek } from 'models';
import {
  PlanActionCook,
  PlanActionType,
  PlanActionEat,
  PlanAction,
} from '../types';
import { initializeWeek } from './utils';
import { id } from 'tools';

export default (schedule: Schedule, weekIndex: number): PlanWeek => {
  const week = initializeWeek(schedule, weekIndex, () => true);

  week.meals.forEach(meal => {
    const ScheduleMeal = schedule.getMeal(meal.dayIndex, meal.mealIndex);
    const mealType = {
      LONG: 'FANCY',
      MEDIUM: 'NORMAL',
      SHORT: 'QUICK',
    }[ScheduleMeal.availability];
    if (mealType) {
      const cookAction: PlanActionCook = {
        id: id('action'),
        type: PlanActionType.Cook,
        mealType,
        weekIndex,
        dayIndex: meal.dayIndex,
        mealIndex: meal.mealIndex,
        servings: schedule.defaultServings,
      };
      const eatAction: PlanActionEat = {
        id: id('action'),
        type: PlanActionType.Eat,
        weekIndex,
        dayIndex: meal.dayIndex,
        mealIndex: meal.mealIndex,
        cookActionId: cookAction.id,
        leftovers: false,
      };

      meal.actions.push(cookAction, eatAction);
    } else {
      meal.actions.push({
        id: id('action'),
        weekIndex,
        dayIndex: meal.dayIndex,
        mealIndex: meal.mealIndex,
        type:
          ScheduleMeal.availability === 'EAT_OUT'
            ? PlanActionType.EatOut
            : PlanActionType.Skip,
      } as PlanAction);
    }
  });

  return new PlanWeek(week);
};
