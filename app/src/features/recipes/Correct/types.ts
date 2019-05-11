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

export interface IngredientCorrectorRecipeIngredient {
  id?: string;
  text: string;
  unit?: string;
  unitStart?: number;
  unitEnd?: number;
  quantity: number;
  quantityStart?: number;
  quantityEnd?: number;
  ingredient?: {
    id: string;
    name: string;
  };
  ingredientStart?: number;
  ingredientEnd?: number;
}

export enum CorrectionType {
  Change = 'Change',
  Delete = 'Delete',
  Add = 'Add',
}
