import { id } from 'tools';
import { UserInputError } from 'errors';
import { addDays, addWeeks } from 'date-fns';
import { START_WEEK_DAY } from '../../constants';
import {
  PlanWeekData,
  PlanAction,
  PlanActionCook,
  PlanActionData,
} from './types';
import Schedule from '../Schedule';
import planner from './planner';

const getWeekDay = ({ weekIndex, startDay, dayOffset = 0 }) => {
  const date = new Date(startDay.valueOf());
  return addDays(addWeeks(date, weekIndex), dayOffset);
};

/**
 * The output of a Plan, a PlanWeek is a list of meals (starting at the first cooked meal in the week)
 * which each contain various actions to preform.
 */
export default class PlanWeek {
  data: PlanWeekData;
  actions: { [id: string]: PlanAction } = {};
  generateId: (name: string) => string;

  constructor(data?: PlanWeekData, { generateId = id } = {}) {
    this.generateId = generateId;
    this.data = data;

    this.data.meals.forEach(meal => {
      meal.actions.forEach(action => {
        this.actions[action.id] = action;
      });
    });
  }

  get id() {
    return this.data.id;
  }

  get weekIndex() {
    return this.data.weekIndex;
  }

  get meals() {
    return this.data.meals;
  }

  get startDay() {
    return this.data.startDay;
  }

  get startMeal() {
    return this.data.startMeal;
  }

  set id(id: string) {
    this.data.id = id;
  }

  set weekIndex(week: number) {
    this.data.weekIndex = week;
  }

  set startDay(day: number) {
    this.data.startDay = day;
  }

  set startMeal(meal: number) {
    this.data.startMeal = meal;
  }

  get startDate() {
    return getWeekDay({
      weekIndex: this.data.weekIndex,
      startDay: START_WEEK_DAY,
      dayOffset: this.data.startDay,
    });
  }

  getUnplannedMeals = () => {
    return this.data.meals.filter(meal => meal.actions.length === 0);
  };

  get plannedMealCount() {
    return this.meals.filter(meal =>
      meal.actions.some(action =>
        ['EAT', 'EAT_OUT', 'READY_MADE', 'SKIP'].includes(action.type),
      ),
    ).length;
  }

  get fullyPrepared() {
    return this.plannedMealCount === 21;
  }

  getAction = id => this.actions[id];

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
        },
        EAT: {
          leftovers: false,
        },
      }[actionType] || {}
    );
  };

  setActionRecipe = (actionId, recipeId) => {
    const action = this.actions[actionId];
    if (!action || action.type !== 'COOK') {
      throw new UserInputError(
        "You can't assign a recipe to a non-cooking action",
      );
    }

    (action as PlanActionCook).recipeId = recipeId;
    return action;
  };

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
  createActionId = (mealIndex, actionIndex, actionType) =>
    `${mealIndex}_${actionIndex}_${actionType}`;

  addAction = (dayIndex, mealIndex, actionData: PlanActionData) => {
    const meal = this.data.meals.find(
      m => m.dayIndex === dayIndex && m.mealIndex === mealIndex,
    );
    const actionIndex = meal.actions.length;
    const id = this.createActionId(mealIndex, actionIndex, actionData.type);
    const action: PlanAction = ({
      id,
      ...actionData,
    } as unknown) as PlanAction; // not sure how to get around this algebraic type thing...

    meal.actions.push(action);
    this.actions[id] = action;
    return action;
  };

  toJSON() {
    return this.data;
  }

  static fromJSON(json) {
    return new PlanWeek(json);
  }

  static fromSchedule(plan: Schedule, weekIndex: number) {
    return planner.run(plan, weekIndex);
  }
}
