import { id } from 'tools';
import { clone, mergeDeepWith, mergeDeepRight, pathOr } from 'ramda';

const EMPTY = {
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
  actions = {};

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

  get weekIndex() {
    return this.data.weekIndex;
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
