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

  /**
   * Adds a usage string which may help the search find this ingredient
   * in the future
   */
  addSearchHelper = (
    ingredientId: string,
    searchHelper: string,
  ): Promise<Ingredient> =>
    this.ctx.writeTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (ingredient:Ingredient{id: $ingredientId})
        SET ingredient.searchHelpers = coalesce(ingredient.searchHelpers, []) + $searchHelper
        RETURN ingredient {${this.dbFields}}
        `,
        {
          ingredientId,
          searchHelper,
        },
      );

      return this.hydrateOne(result);
    });
}
