type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export enum PlanActionType {
  Cook = 'COOK',
  Eat = 'EAT',
  Skip = 'SKIP',
  EatOut = 'EAT_OUT',
  ReadyMade = 'READY_MADE',
}

export interface PlanActionBase {
  id: string;
  type: PlanActionType;
  weekIndex: number;
  dayIndex: number;
  mealIndex: number;
}

export interface PlanActionCook extends PlanActionBase {
  type: PlanActionType.Cook;
  recipeId?: string;
  servings: number;
  mealType: string; // TODO: enum
}

export interface PlanActionEat extends PlanActionBase {
  type: PlanActionType.Eat;
  cookActionId: string;
  leftovers: boolean;
}

export interface PlanActionSkip extends PlanActionBase {
  type: PlanActionType.Skip;
}

export interface PlanActionEatOut extends PlanActionBase {
  type: PlanActionType.EatOut;
  note?: string;
}

export interface PlanActionReadyMade extends PlanActionBase {
  type: PlanActionType.ReadyMade;
  note?: string;
}

export type PlanAction =
  | PlanActionCook
  | PlanActionEat
  | PlanActionSkip
  | PlanActionEatOut
  | PlanActionReadyMade;

export type PlanActionData = Omit<PlanAction, 'id'>;

export interface PlanWeekMeal {
  id: string;
  weekIndex: number;
  mealIndex: number;
  dayIndex: number;
  actions: PlanAction[];
}

export interface PlanWeekData {
  id: string;
  weekIndex: number;
  startDay: number;
  startMeal: number;
  mealsPerDay: number;

  meals: PlanWeekMeal[];
}
