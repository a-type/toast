import {
  PlanAction,
  PlanActionCook,
  PlanActionType,
  PlanActionEat,
  PlanActionEatOut,
  PlanActionSkip,
} from 'models/PlanWeek';

export function isCookAction(action: PlanAction): action is PlanActionCook {
  return action.type === PlanActionType.Cook;
}

export function isEatAction(action: PlanAction): action is PlanActionEat {
  return action.type === PlanActionType.Eat;
}

export function isEatOutAction(action: PlanAction): action is PlanActionEatOut {
  return action.type === PlanActionType.EatOut;
}

export function isSkipAction(action: PlanAction): action is PlanActionSkip {
  return action.type === PlanActionType.Skip;
}
