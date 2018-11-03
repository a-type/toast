import Source from './Source';

export default class Ingredients extends Source {
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
