import {
  PlanAction,
  PlanActionType,
  PlanActionCook,
  PlanActionEat,
  PlanActionEatOut,
  PlanActionSkip,
  PlanActionReadyMade,
} from 'generated/schema';

export function isCookAction(action: PlanAction): action is PlanActionCook {
  return action.type === PlanActionType.COOK;
}

export function isEatAction(action: PlanAction): action is PlanActionEat {
  return action.type === PlanActionType.EAT;
}

export function isEatOutAction(action: PlanAction): action is PlanActionEatOut {
  return action.type === PlanActionType.EAT_OUT;
}

export function isSkipAction(action: PlanAction): action is PlanActionSkip {
  return action.type === PlanActionType.SKIP;
}

export function isReadyMadeAction(
  action: PlanAction,
): action is PlanActionReadyMade {
  return action.type === PlanActionType.READY_MADE;
}
