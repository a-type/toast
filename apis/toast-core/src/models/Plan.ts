import { id } from 'tools';
import { pathOr } from 'ramda';
import { UserInputError } from 'errors';

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
}

export interface PlanActionCook extends PlanActionBase {
  type: PlanActionType.Cook;
  recipeId: string;
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

export type PlanMeal = {
  id?: string;
  mealIndex?: number;
  dayIndex?: number;
  availability?: string; // TODO: enum
  servings?: number;
  actions?: Array<PlanAction>;
};

export type PlanDay = {
  id?: string;
  dayIndex?: number;
  meals?: PlanMeal[];
};

export type PlanData = {
  id?: string;
  defaultServings?: number;
  groceryDay?: number;
  weekIndex?: number;
  isBlueprint?: boolean;
  strategy?: string; // TODO: enum

  days?: PlanDay[];
  warnings?: string[];
};

const EMPTY: PlanData = {
  id: null,
  defaultServings: 2,
  groceryDay: 0,
  weekIndex: null,
  isBlueprint: false,
  strategy: 'BASIC',

  days: new Array(7).fill(null).map((_, dayIndex) => ({
    dayIndex,
    meals: new Array(3).fill(null).map((__, mealIndex) => ({
      mealIndex,
      dayIndex,
      availability: 'SKIP',
      actions: [],
      servings: 2,
    })),
  })),

  warnings: [],
};

const merge = (def, override) => ({
  ...def,
  ...override,
  days: def.days.map((defDay, dayIndex) => ({
    ...defDay,
    ...pathOr({}, ['days', dayIndex], override),
    meals: defDay.meals.map((defMeal, mealIndex) => ({
      ...defMeal,
      ...pathOr({}, ['days', dayIndex, 'meals', mealIndex], override),
      actions:
        pathOr(
          null,
          ['days', dayIndex, 'meals', mealIndex, 'actions'],
          override,
        ) || defMeal.actions,
    })),
  })),
});

export default class Plan {
  data = EMPTY;
  actions: { [id: string]: PlanAction } = {};
  generateId: (name: string) => string;

  constructor(data = EMPTY, { generateId = id } = {}) {
    this.generateId = generateId;
    this.data = merge(EMPTY, data);
    this.data.id = this.data.id || generateId('plan');

    this.data.days.forEach((day, dayIndex) => {
      day.id = `${this.data.id}-day_${dayIndex}`;
      day.meals.forEach((meal, mealIndex) => {
        meal.id = `${this.data.id}-day_${dayIndex}-meal_${mealIndex}`;
        meal.actions.forEach(action => {
          if (!action.id) {
            action.id = generateId('action');
          }
          this.actions[action.id] = action;
        });
      });
    });
  }

  get id() {
    return this.data.id;
  }

  get strategy() {
    return this.data.strategy;
  }

  get weekIndex() {
    return this.data.weekIndex;
  }

  get defaultServings() {
    return this.data.defaultServings;
  }

  get groceryDay() {
    return this.data.groceryDay;
  }

  get isBlueprint() {
    return this.data.isBlueprint;
  }

  get days() {
    return this.data.days;
  }

  get warnings() {
    return this.data.warnings;
  }

  get plannedMealCount() {
    return this.listMeals().filter(meal =>
      meal.actions.some(action =>
        ['EAT', 'EAT_OUT', 'READY_MADE', 'SKIP'].includes(action.type),
      ),
    ).length;
  }

  get fullyPrepared() {
    return this.plannedMealCount === 21;
  }

  set id(planId) {
    this.data.id = planId || null;
  }

  set weekIndex(weekIndex) {
    this.data.weekIndex = weekIndex || null;
  }

  set defaultServings(defaultServings) {
    this.data.defaultServings = defaultServings || 2;
  }

  set groceryDay(groceryDay) {
    this.data.groceryDay = groceryDay || null;
  }

  set strategy(strategy) {
    this.data.strategy = strategy;
  }

  getUnplannedMeals = () => {
    return this.listMeals().filter(meal => meal.actions.length === 0);
  };

  getAction = id => {
    return this.actions[id];
  };

  getActionsOfType = actionType => {
    return Object.values(this.actions).filter(
      action => action.type === actionType,
    );
  };

  getTypedActionDefaults = actionType => {
    return (
      {
        COOK: {
          mealType: 'NORMAL',
          servings: this.data.defaultServings,
        },
        EAT: {
          leftovers: false,
        },
      }[actionType] || {}
    );
  };

  getActionDefaults = actionType => ({
    id: this.generateId('action'),
    type: actionType,
    ...this.getTypedActionDefaults(actionType),
  });

  listMeals = (mealIndexes = [0, 1, 2]) => {
    return this.data.days.reduce(
      (allMeals, day) => [
        ...allMeals,
        ...day.meals.filter(meal => mealIndexes.includes(meal.mealIndex)),
      ],
      [],
    );
  };

  addAction = (day, meal, type, details = {}) => {
    const action = {
      dayIndex: day,
      mealIndex: meal,
      ...this.getActionDefaults(type),
      ...details,
    };

    const actions = this.data.days[day].meals[meal].actions;
    actions.push(action);

    this.actions[action.id] = action;

    return action;
  };

  setMealDetails = (dayIndex, mealIndex, details = {}) => {
    const meal = this.data.days[dayIndex].meals[mealIndex];
    Object.assign(meal, details);
  };

  setActionRecipe = (dayIndex, mealIndex, actionId, recipeId) => {
    const meal = this.data.days[dayIndex].meals[mealIndex];
    const action = meal.actions.find(action => action.id === actionId);
    if (!action || action.type !== 'COOK') {
      throw new UserInputError(
        "You can't assign a recipe to a non-cooking action",
      );
    }

    (action as PlanActionCook).recipeId = recipeId;
    return action;
  };

  addWarning = warning => {
    this.data.warnings.push(warning);
  };

  reset = () => {
    this.data.warnings = [];
    this.data.days.forEach(day => {
      day.meals.forEach(meal => {
        meal.actions = [];
      });
    });
    this.actions = {};
  };

  countMealsWithAvailability = availability => {
    const options = [].concat(availability);
    return this.listMeals().filter(meal => options.includes(meal.availability))
      .length;
  };

  toJSON() {
    return this.data;
  }

  static fromJSON(planData) {
    return new Plan(planData);
  }
}
