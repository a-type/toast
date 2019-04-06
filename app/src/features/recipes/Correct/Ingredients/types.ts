export interface RecipeIngredientCorrectedValueInput {
  unit?: string;
  unitStart?: number;
  unitEnd?: number;
  quantity?: number;
  quantityStart?: number;
  quantityEnd?: number;
  ingredientId?: string;
  ingredientStart?: number;
  ingredientEnd?: number;
  text?: string;
}

export enum CorrectionType {
  Change = 'Change',
  Delete = 'Delete',
  Add = 'Add',
}
