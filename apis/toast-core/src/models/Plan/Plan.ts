export interface PlanData {
  id: string;
  groceryDay: number;
}

export default class Plan {
  data: PlanData;

  constructor(data: PlanData) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get groceryDay() {
    return this.data.groceryDay;
  }

  set groceryDay(day: number) {
    this.data.groceryDay = day;
  }

  toJSON() {
    return this.data;
  }

  static fromJSON(data) {
    return new Plan(data);
  }

  static createEmpty(id: string) {
    return new Plan({ id, groceryDay: 0 });
  }
}
