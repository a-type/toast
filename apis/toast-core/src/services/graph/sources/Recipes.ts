import { timestamp, id } from 'tools';
import { omit, pick } from 'ramda';
import Source from './Source';
// TODO; migrate
import { parseRecipeIngredient_withTransaction } from 'schema/recipes/recipeIngredients/service';
import { RecipeIngredient } from './RecipeIngredients';
import { Ingredient } from './Ingredients';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  attribution: string;
  sourceUrl: string;
  published: boolean;
  displayType: 'LINK' | 'FULL';
  createdAt: any;
  updatedAt: any;
  viewedAt: any;
  views: number;
  servings: number;
  cookTime: number;
  prepTime: number;
  unattendedTime: number;
}

export interface RecipeIngredientWithIngredient extends RecipeIngredient {
  ingredient: Ingredient;
}
export interface RecipeWithIngredients extends Recipe {
  ingredients: RecipeIngredientWithIngredient[];
}

export default class Recipes extends Source<Recipe> {
  constructor(ctx, graph) {
    super(ctx, graph, 'Recipe', [
      'id',
      'title',
      'description',
      'attribution',
      'sourceUrl',
      'published',
      'displayType',
      'createdAt',
      'updatedAt',
      'viewedAt',
      'views',
      'servings',
      'cookTime',
      'prepTime',
      'unattendedTime',
    ]);
  }

  get = recipeId =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
          MATCH (recipe:Recipe {id: $id}) RETURN recipe {${this.dbFields}}
        `,
        { id: recipeId },
      );

      return this.hydrateOne(result);
    });

  getAllWithIngredients = (
    recipeIds: string[],
  ): Promise<RecipeWithIngredients[]> =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
          UNWIND $recipeIds as id
          MATCH (recipe:Recipe {id: id})<-[:INGREDIENT_OF]-(recipeIngredient:RecipeIngredient)<-[:USED_IN]-(ingredient:Ingredient)
          WITH recipe, [recipeIngredient, ingredient] as tuple
          WITH recipe, collect(tuple) as recipeIngredients
          RETURN recipe {${this.dbFields}}, recipeIngredients
        `,
        { recipeIds },
      );

      if (result.records.length) {
        return result.records.map<RecipeWithIngredients>(record => {
          const recipe = record.get('recipe');
          const recipeIngredients = record
            .get('recipeIngredients')
            .map(([ri, i]) => {
              const recipeIngredient = ri.properties;
              recipeIngredient.ingredient = i.properties;
              return recipeIngredient;
            });
          recipe.ingredients = recipeIngredients;
          return recipe;
        });
      }
      return [];
    });

  list = ({ offset = 0, count = 25 } = {}) =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
          MATCH (recipe:Recipe)
          WHERE recipe.published = true
          RETURN recipe { ${this.dbFields} }
          ORDER BY coalesce(recipe.views, 0) DESC
          SKIP $offset LIMIT $count
        `,
        { offset, count },
      );

      return this.hydrateList(result);
    });

  listForIngredient = (ingredientId, { offset = 0, count = 25 } = {}) =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
          MATCH (ingredient:Ingredient { id: $ingredientId })-[:USED_IN]->()-[:INGREDIENT_OF]->(recipe:Recipe)
          WHERE recipe.published = true
          RETURN recipe { ${this.dbFields} }
          SKIP $offset LIMIT $count
        `,
        {
          ingredientId,
          offset,
          count,
        },
      );

      return this.hydrateList(result);
    });

  listAuthoredForUser = (userId, { offset, count }) =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
          MATCH (user:User { id: $userId })-[:AUTHOR_OF]->(recipe:Recipe)
          WHERE coalesce(recipe.published, false) = true
          RETURN recipe { ${this.dbFields} }
          SKIP $offset LIMIT $count
        `,
        {
          userId,
          offset,
          count,
        },
      );

      return this.hydrateList(result);
    });

  listDiscoveredForUser = (userId, { offset, count }) =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
          MATCH (user:User { id: $userId })-[:DISCOVERER_OF]->(recipe:Recipe)
          RETURN recipe { ${this.dbFields} }
          SKIP $offset LIMIT $count
        `,
        {
          userId,
          offset,
          count,
        },
      );

      return this.hydrateList(result);
    });

  listDraftsForUser = (userId, { offset, count }) =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
          MATCH (user:User { id: $userId })-[:AUTHOR_OF]->(recipe:Recipe)
          WHERE coalesce(recipe.published, false) = false
          RETURN recipe { ${this.dbFields} }
          SKIP $offset LIMIT $count
        `,
        {
          userId,
          offset,
          count,
        },
      );

      return this.hydrateList(result);
    });

  listLikedForUser = (userId, { offset, count }) =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
        MATCH (user:User { id: $userId })-[:LIKES]->(recipe:Recipe)
        RETURN recipe { ${this.dbFields} }
        SKIP $offset LIMIT $count
      `,
        {
          userId,
          offset,
          count,
        },
      );

      return this.hydrateList(result);
    });

  create = (input: Partial<Recipe>) =>
    this.ctx.transaction(async tx => {
      const time = timestamp();
      const user = this.ctx.user;

      const result = await tx.run(
        `
        MATCH (u:User {id: $userId})
        CREATE (recipe:Recipe $input),
          (recipe)<-[:AUTHOR_OF]-(u)
        RETURN recipe {${this.dbFields}}
      `,
        {
          input: {
            ...input,
            id: id(input.title),
            displayType: 'FULL',
            published: false,
            createdAt: time,
            updatedAt: time,
            viewedAt: time,
          },
          userId: user.id,
        },
      );

      return this.hydrateOne(result);
    });

  link = (input: Partial<Recipe> & { ingredientStrings: string[] }) =>
    this.ctx.transaction(async tx => {
      const user = this.ctx.user;
      const time = timestamp();

      const existing = await tx.run(
        `
        MATCH (recipe:Recipe {sourceUrl: $sourceUrl})
        RETURN recipe {${this.dbFields}}
        `,
        {
          sourceUrl: input.sourceUrl,
        },
      );

      if (existing.records.length) {
        // TODO: like duplicate
        return this.hydrateOne(existing);
      }

      const result = await tx.run(
        `
        MERGE (recipe:Recipe {sourceUrl: $sourceUrl})
          ON CREATE SET recipe += $input, recipe.id = $id
        RETURN recipe {${this.dbFields}}
      `,
        {
          sourceUrl: input.sourceUrl,
          input: {
            ...omit(['ingredientStrings'], input),
            displayType: 'LINK',
            published: true,
            createdAt: time,
            updatedAt: time,
            viewedAt: time,
          },
          id: id(input.title),
          userId: user.id,
        },
      );

      const recipe = this.hydrateOne(result);

      await tx.run(
        `
        MATCH (r:Recipe {id: $recipeId}), (u:User {id: $userId})
        MERGE (r)<-[:DISCOVERER_OF]-(u)
        RETURN r
        `,
        { recipeId: recipe.id, userId: user.id },
      );

      await Promise.all(
        input.ingredientStrings.map(ingredientString => {
          return parseRecipeIngredient_withTransaction(
            recipe.id,
            { text: ingredientString },
            tx,
            this.ctx,
          );
        }),
      );

      return recipe;
    });

  updateDetails = (id: string, input: Partial<Recipe>) =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
          MATCH (recipe:Recipe {id: $id})<-[:AUTHOR_OF]-(:User {id: $userId})
          SET recipe += $input
          RETURN recipe { ${this.dbFields} };
        `,
        {
          id,
          input: {
            ...pick(
              [
                'title',
                'description',
                'attribution',
                'sourceUrl',
                'displayType',
                'servings',
                'cookTime',
                'prepTime',
                'unattendedTime',
              ],
              input,
            ),
            updatedAt: timestamp(),
          },
          userId: this.ctx.user.id,
        },
      );

      return this.hydrateOne(result, { throwIfNone: true });
    });

  publish = (id: string) =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
          MATCH (recipe:Recipe { id: $id })<-[:AUTHOR_OF]-(:User {id: $userId})
          SET recipe.published = true, recipe.updatedAt = $time
          RETURN recipe {${this.dbFields}}
        `,
        { id, time: timestamp(), userId: this.ctx.user.id },
      );

      return this.hydrateOne(result, { throwIfNone: true });
    });

  recordView = (id: string) =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
          MATCH (recipe:Recipe { id: $id })
          WITH recipe,
            CASE WHEN datetime(coalesce(recipe.viewedAt, '2018-08-31T00:00:00')) + duration("PT1M") < datetime($time) THEN 1 ELSE 0 END as increment
          SET recipe.views = coalesce(recipe.views, 0) + increment, recipe.viewedAt = $time
          RETURN recipe { ${this.dbFields} }
        `,
        {
          id,
          time: timestamp(),
        },
      );

      return this.hydrateOne(result);
    });
}
