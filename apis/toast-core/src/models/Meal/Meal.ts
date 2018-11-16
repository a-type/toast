import { getDay } from 'date-fns';
import { isCookAction } from 'guards/planActions';
import { dates } from 'tools';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export enum MealActionType {
  Cook = 'COOK',
  Eat = 'EAT',
  Skip = 'SKIP',
  EatOut = 'EAT_OUT',
  ReadyMade = 'READY_MADE',
}

export interface MealActionBase {
  id: string;
  type: MealActionType;
}

export interface MealActionCook extends MealActionBase {
  type: MealActionType.Cook;
  recipeId?: string;
  servings: number;
  mealType: string; // TODO: enum
}

export interface MealActionEat extends MealActionBase {
  type: MealActionType.Eat;
  cookActionId: string;
  leftovers: boolean;
}

export interface MealActionSkip extends MealActionBase {
  type: MealActionType.Skip;
}

export interface MealActionEatOut extends MealActionBase {
  type: MealActionType.EatOut;
  note?: string;
}

export interface MealActionReadyMade extends MealActionBase {
  type: MealActionType.ReadyMade;
  note?: string;
}

export type MealAction =
  | MealActionCook
  | MealActionEat
  | MealActionSkip
  | MealActionEatOut
  | MealActionReadyMade;

export type MealActionData = Omit<MealAction, 'id'>;

export interface MealData {
  id: string;
  /**
   * Meal, i.e. meal within a day (Breakfast, Lunch...)
   */
  mealIndex: number;
  /**
   * Absolute date, i.e. the number of days since the start of the plan
   */
  dateIndex: number;
  /**
   * Actions to be taken during this meal
   */
  actions: MealAction[];
}

export default class Meal {
  data: MealData;

  constructor(data: MealData) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get mealIndex() {
    return this.data.mealIndex;
  }

  get date() {
    return dates.getDate(this.data.dateIndex);
  }

  get dayIndex() {
    return getDay(this.date);
  }

  get actions() {
    return this.data.actions;
  }

  getAction = actionId => this.actions.find(({ id }) => id === actionId);

  getActionsOfType = (actionType: MealActionType) =>
    this.actions.filter(({ type }) => type === actionType);

  /**
   * It is important that every action ID is deterministic according
   * to its position.
   *
   * This is because a week may be generated in an ephemeral form, but we
   * want references to actions to remain consistent.
   *
   * For that reason it's probably easier to think of an action's id as its
   * coordinate "position", not an arbitrary identifier.
   */
  createActionId = (actionIndex, actionType) =>
    `m_${this.data.dateIndex}_${
      this.data.mealIndex
    }_a_${actionIndex}_${actionType}`;

  addAction = (actionData: MealActionData) => {
    const actionIndex = this.actions.length;
    const id = this.createActionId(actionIndex, actionData.type);
    const action: MealAction = ({
      id,
      ...actionData,
    } as unknown) as MealAction; // not sure how to get around this algebraic type thing...

    this.actions.push(action);
    return action;
  };

  setActionRecipe = (actionId, recipeId) => {
    const action = this.data.actions.find(({ id }) => id === actionId);
    if (!action) {
      throw new Error('That action does not exist');
    }
    if (isCookAction(action)) {
      action.recipeId = recipeId;
    } else {
      throw new Error("You can't set a recipe on an action that isn't cooking");
    }

    return action;
  };

  toJSON() {
    return this.data;
  }

  static fromJSON(data) {
    return new Meal(data);
  }

  static getDateIndex = dates.getDateIndex;

  static getId(dateIndex: number, mealIndex: number) {
    return `meal_${dateIndex}_${mealIndex}`;
  }

  static createEmpty(dateIndex: number, mealIndex: number) {
    return new Meal({
      id: Meal.getId(dateIndex, mealIndex),
      mealIndex,
      dateIndex,
      actions: [],
    });
  }
}
