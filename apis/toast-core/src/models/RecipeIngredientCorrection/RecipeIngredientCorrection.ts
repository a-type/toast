export enum CorrectionStatus {
  Submitted,
  Accepted,
  Rejected,
}

export interface RecipeIngredientCorrectedValue {
  unit: string;
  unitTextMatch: string;
  value: number;
  valueTextMatch: string;
  ingredientTextMatch: string;
  text: string;
  ingredientId: string;
}

export interface RecipeIngredientCorrectionData {
  id: string;
  resourceId: string;
  correctedValue: RecipeIngredientCorrectedValue;
  reportingUserId: string;
}

export default class RecipeIngredientCorrection {
  private data: RecipeIngredientCorrectionData;

  constructor(data: RecipeIngredientCorrectionData) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get resourceId() {
    return this.data.resourceId;
  }

  get correctedValue() {
    return this.data.correctedValue;
  }

  get reportingUserId() {
    return this.data.reportingUserId;
  }

  toJSON() {
    return this.data;
  }

  static fromJSON(data) {
    return new RecipeIngredientCorrection(data);
  }
}
