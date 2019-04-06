import {
  MealAction,
  MealActionType,
  MealActionCook,
  MealActionEat,
  MealActionEatOut,
  MealActionSkip,
  MealActionReadyMade,
} from 'generated/schema';

export function isCookAction(action: MealAction): action is MealActionCook {
  return action.type === MealActionType.COOK;
}

export function isEatAction(action: MealAction): action is MealActionEat {
  return action.type === MealActionType.EAT;
}

export function isEatOutAction(action: MealAction): action is MealActionEatOut {
  return action.type === MealActionType.EAT_OUT;
}

export function isSkipAction(action: MealAction): action is MealActionSkip {
  return action.type === MealActionType.SKIP;
}

export function isReadyMadeAction(
  action: MealAction,
): action is MealActionReadyMade {
  return action.type === MealActionType.READY_MADE;
}
