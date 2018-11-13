import { id } from 'tools';
import { UserInputError } from 'errors';
import { addDays, addWeeks } from 'date-fns';
import { START_WEEK_DAY } from '../../constants';
import { PlanWeekData, PlanAction, PlanActionCook } from './types';
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

  getActionDefaults = actionType => ({
    id: this.generateId('action'),
    type: actionType,
    ...this.getTypedActionDefaults(actionType),
  });

  addAction = (day, meal, type, details = {}) => {
    const action: PlanAction = {
      dayIndex: day,
      mealIndex: meal,
      ...this.getActionDefaults(type),
      ...details,
    };

    this.data.meals[meal].actions.push(action);
    this.actions[action.id] = action;

    return action;
  };

  setActionRecipe = (mealIndex, actionId, recipeId) => {
    const meal = this.data.meals[mealIndex];
    const action = meal.actions.find(action => action.id === actionId);
    if (!action || action.type !== 'COOK') {
      throw new UserInputError(
        "You can't assign a recipe to a non-cooking action",
      );
    }

    (action as PlanActionCook).recipeId = recipeId;
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
