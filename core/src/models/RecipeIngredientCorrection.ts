import { removeUndefined } from 'tools';

export enum CorrectionStatus {
  Submitted = 'Submitted',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export enum CorrectionType {
  Change = 'Change',
  Delete = 'Delete',
  Add = 'Add',
}

export interface RecipeIngredientCorrectedValue {
  unit: string;
  unitStart: number;
  unitEnd: number;
  quantity: number;
  quantityStart: number;
  quantityEnd: number;
  ingredientStart: number;
  ingredientEnd: number;
  ingredientId: string;
}

export interface RecipeIngredientCorrectionData {
  id: string;
  recipeIngredientId: string;
  recipeId: string;
  correctedValue: RecipeIngredientCorrectedValue;
  correctedText: string;
  reportingUserId: string;
  status: CorrectionStatus;
  correctionType: CorrectionType;
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

  get recipeId() {
    return this.data.recipeId;
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

  get correctionType() {
    return this.data.correctionType;
  }

  get correctedText() {
    return this.data.correctedText;
  }

  set status(status: CorrectionStatus) {
    this.data.status = status;
  }

  toJSON() {
    return removeUndefined(this.data);
  }

  static fromJSON(data) {
    return new RecipeIngredientCorrection(data);
  }
}
