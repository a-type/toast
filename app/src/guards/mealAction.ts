import { MealActionType } from 'formatters/actionType';

export enum MealRecipeType {
  QUICK = 'QUICK',
  BIG = 'BIG',
  FANCY = 'FANCY',
  NORMAL = 'NORMAL',
}

export interface MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;
}

export interface MealActionCook extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;

  servings: number;

  recipeType: MealRecipeType;

  recipe?: any | null;

  recipeId?: string | null;
}

export interface MealActionEat extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;

  leftovers: boolean;

  cookAction?: MealActionCook | null;
}

export interface MealActionEatOut extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;

  note?: string | null;
}

export interface MealActionReadyMade extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;

  note?: string | null;
}

export interface MealActionSkip extends MealAction {
  id: string;

  type: MealActionType;

  dayIndex?: number | null;

  mealIndex?: number | null;
}

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
