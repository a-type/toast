export interface PlanData {
  id: string;
}

export default class Plan {
  data: PlanData;

  constructor(data: PlanData) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  toJSON() {
    return this.data;
  }

  static fromJSON(data) {
    return new Plan(data);
  }
}
