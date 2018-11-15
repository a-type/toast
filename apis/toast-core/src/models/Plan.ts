export interface PlanData {
  id: string;
  /**
   * Represents the total offset in days from the canonical week
   * start point.
   */
  dayOffset: number;
  /**
   * Within the start day, this is the number of meals that
   * the week is offset by.
   */
  mealOffset: number;
}

export default class Plan {
  data: PlanData;

  constructor(data: PlanData) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get dayOffset() {
    return this.data.dayOffset;
  }

  get mealOffset() {
    return this.data.mealOffset;
  }

  set dayOffset(offset: number) {
    if (offset < 0 || offset > 6) {
      throw new Error('Offset must be from 0 to 6');
    }
    this.data.dayOffset = offset;
  }

  set mealOffset(offset: number) {
    if (offset < 0) {
      throw new Error('Offset must be greater than 0');
    }
    this.data.mealOffset = offset;
  }

  toJSON() {
    return this.data;
  }

  static fromJSON(data) {
    return new Plan(data);
  }
}
