import Source from './Source';
import { id } from 'tools';

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

  create = (
    recipeId: string,
    ingredientId: string,
    input: Partial<RecipeIngredient>,
  ) =>
    this.ctx.writeTransaction(async tx => {
      const query = ingredientId
        ? `
        MATCH (recipe:Recipe {id: $recipeId}), (ingredient:Ingredient {id: $ingredientId})
        OPTIONAL MATCH (recipe)<-[allRels:INGREDIENT_OF]-()
        WITH recipe, count(allRels) as index, ingredient
        CREATE (recipe)<-[rel:INGREDIENT_OF { index: index }]-(recipeIngredient:RecipeIngredient $props)<-[:USED_IN]-(ingredient)
        RETURN recipeIngredient {${this.dbFields}}
        `
        : `
        MATCH (recipe:Recipe {id: $recipeId})
        OPTIONAL MATCH (recipe)<-[allRels:INGREDIENT_OF]-()
        WITH recipe, count(allRels) as index
        CREATE (recipe)<-[rel:INGREDIENT_OF { index: index }]-(recipeIngredient:RecipeIngredient $props)
        RETURN recipeIngredient {${this.dbFields}}
        `;

      const result = await tx.run(query, {
        recipeId,
        ingredientId,
        props: {
          ...input,
          id: id('recipeIngredient'),
        },
      });

      return this.hydrateOne(result);
    });
}
