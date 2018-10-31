import logger from 'logger';
import { timestamp } from 'tools';
import Source from './Source';
// TODO; migrate
import { parseRecipeIngredient_withTransaction } from 'schema/recipes/recipeIngredients/service';

export default class Recipes extends Source {
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

  create = input =>
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

  link = input =>
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
          );
        }),
      );

      return recipe;
    });

  updateDetails = (id, input) =>
    this.ctx.transaction(async tx => {
      const details = await tx.run(
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

  publish = id =>
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

  recordView = id =>
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