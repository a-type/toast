export enum CorrectionStatus {
  Submitted,
  Accepted,
  Rejected,
}

export interface RecipeIngredientCorrectedValue {
  unit: string;
  unitStart: number;
  unitEnd: number;
  value: number;
  valueStart: number;
  valueEnd: number;
  ingredientStart: number;
  ingredientEnd: number;
  text: string;
  ingredientId: string;
}

export interface RecipeIngredientCorrectionData {
  id: string;
  recipeIngredientId: string;
  correctedValue: RecipeIngredientCorrectedValue;
  reportingUserId: string;
  status: CorrectionStatus;
}

export default class RecipeIngredientCorrection {
  private data: RecipeIngredientCorrectionData;

  constructor(data: RecipeIngredientCorrectionData) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get recipeIngredientId() {
    return this.data.recipeIngredientId;
  }

  get correctedValue() {
    return this.data.correctedValue;
  }

  get reportingUserId() {
    return this.data.reportingUserId;
  }

  get status() {
    return this.data.status;
  }

  toJSON() {
    return this.data;
  }

  static fromJSON(data) {
    return new RecipeIngredientCorrection(data);
  }
}
