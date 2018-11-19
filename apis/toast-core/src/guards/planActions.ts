import {
  MealAction,
  MealActionCook,
  MealActionType,
  MealActionEat,
  MealActionEatOut,
  MealActionSkip,
} from 'models/Meal/Meal';

export function isCookAction(action: MealAction): action is MealActionCook {
  return action.type === MealActionType.Cook;
}

export function isEatAction(action: MealAction): action is MealActionEat {
  return action.type === MealActionType.Eat;
}

export function isEatOutAction(action: MealAction): action is MealActionEatOut {
  return action.type === MealActionType.EatOut;
}

export function isSkipAction(action: MealAction): action is MealActionSkip {
  return action.type === MealActionType.Skip;
}
