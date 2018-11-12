import { Plan, PlanWeek } from 'models';
import {
  PlanActionCook,
  PlanActionType,
  PlanActionEat,
  PlanAction,
} from '../types';
import { initializeWeek } from './utils';
import { id } from 'tools';

export default (plan: Plan, weekIndex: number): PlanWeek => {
  const week = initializeWeek(plan, weekIndex, () => true);

  week.meals.forEach(meal => {
    const planMeal = plan.getMeal(meal.dayIndex, meal.mealIndex);
    const mealType = {
      LONG: 'FANCY',
      MEDIUM: 'NORMAL',
      SHORT: 'QUICK',
    }[planMeal.availability];
    if (mealType) {
      const cookAction: PlanActionCook = {
        id: id('action'),
        type: PlanActionType.Cook,
        mealType,
        weekIndex,
        dayIndex: meal.dayIndex,
        mealIndex: meal.mealIndex,
        servings: plan.defaultServings,
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
          planMeal.availability === 'EAT_OUT'
            ? PlanActionType.EatOut
            : PlanActionType.Skip,
      } as PlanAction);
    }
  });

  return new PlanWeek(week);
};
