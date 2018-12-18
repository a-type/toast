import Source from './Source';
import normalizeSearchTerm from 'tools/normalizeSearchTerm';
import stringSimilarity from 'string-similarity';
import { id, timestamp } from 'tools';

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

  private _findClearIngredientWinner = ingredientSearchResult => {
    if (ingredientSearchResult.records.length === 0) {
      return null;
    }
    if (ingredientSearchResult.records.length === 1) {
      return ingredientSearchResult.records[0].get('node');
    }

    const weightOfFirstResult = ingredientSearchResult.records[0].get('weight');
    const weightOfSecondResult = ingredientSearchResult.records[1].get(
      'weight',
    );

    if (weightOfSecondResult / weightOfFirstResult < 0.85) {
      return ingredientSearchResult.records[0].get('node');
    }
  };

  private _ensureIngredientCloseEnough = (searchTerm, ingredient) => {
    if (!ingredient) {
      return null;
    }
    const allComparisons = [
      ingredient.name,
      ...(ingredient.alternateNames || []),
    ];
    const passed =
      allComparisons.reduce(
        (highest, name) =>
          Math.max(
            stringSimilarity.compareTwoStrings(searchTerm, name),
            highest,
          ),
        0,
      ) > 0.75;

    return passed ? ingredient : null;
  };

  searchForBestMatchOrCreate = (textMatch: string): Promise<Ingredient> =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
        CALL apoc.index.search("ingredients", $term) YIELD node, weight
        WITH node, weight
        RETURN node {${this.dbFields}}, weight ORDER BY weight DESC LIMIT 10
        `,
        {
          term: `${normalizeSearchTerm(textMatch)}~`,
        },
      );

      let foundIngredient = this._ensureIngredientCloseEnough(
        textMatch,
        this._findClearIngredientWinner(result),
      );

      if (foundIngredient) {
        return foundIngredient;
      }

      const createResult = await tx.run(
        `
          CREATE (ingredient:Ingredient $props)
          RETURN ingredient {${this.dbFields}}
        `,
        {
          props: {
            id: id(textMatch),
            name: textMatch,
            createdAt: timestamp(),
          },
        },
      );

      return this.hydrateOne(createResult);
    });
}
