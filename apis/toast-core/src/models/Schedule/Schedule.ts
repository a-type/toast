import { id } from 'tools';
import Meal, { MealData } from 'models/Meal/Meal';
import planner from './planner';

export enum ScheduleStrategy {
  Basic = 'BASIC',
  Prep = 'PREP',
}

export type ScheduleMeal = {
  id: string;
  mealIndex: number;
  dayIndex: number;
  availability: string; // TODO: enum
  servings?: number;
};

type BaseScheduleData = {
  id?: string;
  defaultServings: number;
  strategy?: ScheduleStrategy;
  meals: ScheduleMeal[];
  warnings: string[];
};

export type ScheduleData = BaseScheduleData & {
  templateWeek?: MealData[];
};

type InternalScheduleData = BaseScheduleData & {
  templateWeek?: Meal[];
};

const createEmpty = (scheduleId): ScheduleData => {
  return {
    id: scheduleId,
    defaultServings: 2,
    strategy: ScheduleStrategy.Basic,

    meals: new Array(21).fill(null).map((__, mealIndex) => ({
      id: `${scheduleId}_m_${mealIndex}`,
      mealIndex,
      dayIndex: Math.floor(mealIndex / 3),
      availability: 'SKIP',
      servings: 2,
    })),

    templateWeek: [],

    warnings: [],
  };
};

export default class Schedule {
  data: InternalScheduleData;
  generateId: (name: string) => string;

  constructor(data?: ScheduleData, { generateId = id } = {}) {
    this.generateId = generateId;
    const incomingData = data || createEmpty(generateId('schedule'));
    this.data = {
      ...incomingData,
      templateWeek: incomingData.templateWeek.map<Meal>(meal => new Meal(meal)),
    };
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

  get meals() {
    return [...this.data.meals];
  }

  get warnings() {
    return [...this.data.warnings];
  }

  get templateWeek() {
    return [...this.data.templateWeek];
  }

  set id(scheduleId) {
    this.data.id = scheduleId || null;
  }

  set defaultServings(defaultServings) {
    this.data.defaultServings = defaultServings || 2;
    this.updateTemplateWeek();
  }

  set strategy(strategy) {
    this.data.strategy = strategy;
    this.updateTemplateWeek();
  }

  getScheduleMeal = (day: number, meal: number): ScheduleMeal => {
    return this.meals[day * 3 + meal];
  };

  setScheduleMealDetails = (dayIndex, mealIndex, details = {}) => {
    const meal = this.data.meals[dayIndex * 3 + mealIndex];
    Object.assign(meal, details);
    this.updateTemplateWeek();
  };

  updateTemplateWeek = () => {
    this.data.templateWeek = planner.run(this);
  };

  getPlanMeal = (dateIndex: number, mealIndex: number) => {
    // copy basic data from template week and update date
    const dayIndex = dateIndex % 7;
    const templateMeal = this.data.templateWeek.find(
      meal => meal.dayIndex === dayIndex && meal.mealIndex === mealIndex,
    );
    return templateMeal.move(Math.floor((dateIndex - dayIndex) / 7));
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
    return {
      ...this.data,
      templateWeek: this.data.templateWeek.map(meal => meal.toJSON()),
    };
  }

  static fromJSON(data) {
    return new Schedule(data);
  }

  static createEmpty(id: string) {
    return new Schedule({
      id,
      defaultServings: 2,
      strategy: ScheduleStrategy.Basic,

      meals: new Array(21).fill(null).map((__, mealIndex) => ({
        id: `${id}_m_${mealIndex}`,
        mealIndex,
        dayIndex: Math.floor(mealIndex / 3),
        availability: 'SKIP',
        servings: 2,
      })),

      templateWeek: new Array(21)
        .fill(null)
        .map((_, mealIndex) =>
          Meal.createEmpty(Math.floor(mealIndex / 3), mealIndex % 3),
        ),

      warnings: [],
    });
  }
}
