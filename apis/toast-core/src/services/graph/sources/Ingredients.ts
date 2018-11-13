import Source from './Source';

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  attribution: string;
  alternateNames: string[];
}

export default class Ingredients extends Source<Ingredient> {
  constructor(ctx, graph) {
    super(ctx, graph, 'Ingredient', [
      'id',
      'name',
      'description',
      'attribution',
      'alternateNames',
    ]);
  }

  get = ingredientId =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
          MATCH (ingredient: Ingredient { id: $id }) RETURN ingredient {${
            this.dbFields
          }}
        `,
        { id: ingredientId },
      );

      return this.hydrateOne(result);
    });
}
