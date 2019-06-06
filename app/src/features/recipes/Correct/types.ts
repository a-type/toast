export interface IngredientCorrectedFieldsInput {
  unit?: string;
  unitStart?: number;
  unitEnd?: number;
  quantity?: number;
  quantityStart?: number;
  quantityEnd?: number;
  foodId?: string;
  foodStart?: number;
  foodEnd?: number;
}

export interface IngredientCorrectorIngredient {
  id?: string;
  text: string;
  unit?: string;
  unitStart?: number;
  unitEnd?: number;
  quantity: number;
  quantityStart?: number;
  quantityEnd?: number;
  food?: {
    id: string;
    name: string;
  };
  foodStart?: number;
  foodEnd?: number;
}

export enum CorrectionType {
  Change = 'Change',
  Delete = 'Delete',
  Add = 'Add',
}
