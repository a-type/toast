import Source from './Source';

export interface RecipeIngredient {
  id: string;
  unit: string;
  unitTextMatch: string;
  value: number;
  valueTextMatch: string;
  ingredientTextMatch: string;
  text: string;
}

export default class RecipeIngredients extends Source<RecipeIngredient> {
  constructor(ctx, graph) {
    super(ctx, graph, 'RecipeIngredient', [
      'id',
      'unit',
      'unitTextMatch',
      'value',
      'valueTextMatch',
      'ingredientTextMatch',
      'text',
    ]);
  }
}
