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

export interface IngredientCorrectedFields {
  unit: string;
  unitStart: number;
  unitEnd: number;
  quantity: number;
  quantityStart: number;
  quantityEnd: number;
  foodStart: number;
  foodEnd: number;
  foodId: string;
}

export interface IngredientCorrectionData {
  id: string;
  ingredientId: string;
  recipeId: string;
  correctedFields: IngredientCorrectedFields;
  correctedText: string;
  reportingUserId: string;
  status: CorrectionStatus;
  correctionType: CorrectionType;
}

export default class IngredientCorrection {
  private data: IngredientCorrectionData;

  constructor(data: IngredientCorrectionData) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get ingredientId() {
    return this.data.ingredientId;
  }

  get recipeId() {
    return this.data.recipeId;
  }

  get correctedFields() {
    return this.data.correctedFields;
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
    return new IngredientCorrection(data);
  }
}
