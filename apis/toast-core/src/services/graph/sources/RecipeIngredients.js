import Source from './Source';

export default class RecipeIngredients extends Source {
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
