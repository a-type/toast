import { id } from 'tools';
import { pathOr } from 'ramda';

export type PlanMeal = {
  id: string;
  mealIndex: number;
  dayIndex: number;
  availability: string; // TODO: enum
  servings?: number;
};

export type PlanData = {
  id?: string;
  defaultServings: number;
  groceryDay?: number;
  startDay?: number;
  startMeal?: number;
  strategy?: string; // TODO: enum

  meals: PlanMeal[];
  warnings: string[];
};

const createEmpty = (planId): PlanData => {
  return {
    id: planId,
    defaultServings: 2,
    groceryDay: 0,
    startMeal: 2,
    strategy: 'BASIC',

    meals: new Array(21).fill(null).map((__, mealIndex) => ({
      id: `${planId}_m_${mealIndex}`,
      mealIndex,
      dayIndex: Math.floor(mealIndex / 3),
      availability: 'SKIP',
      servings: 2,
    })),

    warnings: [],
  };
};

export default class Plan {
  data: PlanData;
  generateId: (name: string) => string;

  constructor(data?: PlanData, { generateId = id } = {}) {
    this.generateId = generateId;
    this.data = data || createEmpty(generateId('plan'));
  }

  get id() {
    return this.data.id;
  }

  get strategy() {
    return this.data.strategy;
  }

  get defaultServings() {
    return this.data.defaultServings;
  }

  get groceryDay() {
    return this.data.groceryDay;
  }

  get startDay() {
    return this.data.startDay;
  }

  get startMeal() {
    return this.data.startMeal;
  }

  get meals() {
    return this.data.meals;
  }

  get warnings() {
    return this.data.warnings;
  }

  set id(planId) {
    this.data.id = planId || null;
  }

  set defaultServings(defaultServings) {
    this.data.defaultServings = defaultServings || 2;
  }

  set groceryDay(groceryDay) {
    this.data.groceryDay = groceryDay || null;
  }

  set startDay(startDay) {
    this.data.startDay = startDay || null;
  }

  set startMeal(startMeal) {
    this.data.startMeal = startMeal || null;
  }

  set strategy(strategy) {
    this.data.strategy = strategy;
  }

  getMeal = (day: number, meal: number): PlanMeal => {
    return this.meals[day * 3 + meal];
  };

  setMealDetails = (dayIndex, mealIndex, details = {}) => {
    const meal = this.data.meals[dayIndex * 3 + mealIndex];
    Object.assign(meal, details);
  };

  addWarning = warning => {
    this.data.warnings.push(warning);
  };

  reset = () => {
    this.data.warnings = [];
  };

  countMealsWithAvailability = availability => {
    const options = [].concat(availability);
    return this.meals.filter(meal => options.includes(meal.availability))
      .length;
  };

  toJSON() {
    return this.data;
  }

  static fromJSON(planData) {
    return new Plan(planData);
  }
}
