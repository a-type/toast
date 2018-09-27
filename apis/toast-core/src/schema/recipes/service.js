import { pick, omit } from 'ramda';
import { id, timestamp } from 'tools';
import gcloudStorage from 'services/gcloudStorage';
import { parseRecipeIngredient_withTransaction } from './recipeIngredients/service';
import { ApolloError } from 'apollo-server-express';

export const RECIPE_FIELDS =
  '.id, .title, .description, .attribution, .sourceUrl, .published, .displayType, .createdAt, .updatedAt, .viewedAt, .views, .servings, .cookTime, .prepTime, .unattendedTime';
export const DEFAULTS = {
  title: 'Untitled',
  published: false,
  displayType: 'LINK',
  servings: 1,
  createdAt: timestamp(new Date('2018-08-31T00:00:00')),
  updatedAt: timestamp(new Date('2018-08-31T00:00:00')),
  viewedAt: timestamp(new Date('2018-08-31T00:00:00')),
  views: 0,
};

export const defaulted = recipe =>
  Object.keys(DEFAULTS).reduce(
    (acc, key) =>
      recipe[key] !== null ? acc : { ...acc, [key]: DEFAULTS[key] },
    recipe,
  );

export const createRecipe = async (input, ctx) => {
  const user = ctx.user;
  const time = timestamp();

  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (u:User {id: $userId})
      CREATE (r:Recipe $input),
        (r)<-[:AUTHOR_OF]-(u)
      RETURN r {${RECIPE_FIELDS}}
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

    const recipe = result.records[0].get('r');

    return defaulted(recipe);
  });
};

export const linkRecipe = async (input, ctx) => {
  const user = ctx.user;
  const time = timestamp();

  return ctx.transaction(async tx => {
    const existing = await tx.run(
      `
      MATCH (r:Recipe {sourceUrl: $sourceUrl})
      RETURN r {${RECIPE_FIELDS}}
      `,
      {
        sourceUrl: input.sourceUrl,
      },
    );

    if (existing.records.length) {
      return defaulted(existing.records[0].get('r'));
    }

    const result = await tx.run(
      `
      MERGE (r:Recipe {sourceUrl: $sourceUrl})
        ON CREATE SET r += $input, r.id = $id
      RETURN r {${RECIPE_FIELDS}}
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

    const recipe = result.records[0].get('r');

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

    return defaulted(recipe);
  });
};

export const updateRecipeDetails = async (id, input, ctx) => {
  return ctx.transaction(async tx => {
    const details = await tx.run(
      `
      MATCH (recipe:Recipe {id: $id})<-[:AUTHOR_OF]-(:User {id: $userId})
      SET recipe += $input
      RETURN recipe { ${RECIPE_FIELDS} };
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
        userId: ctx.user.id,
      },
    );

    if (details.records.length === 0) {
      throw new ApolloError("That recipe doesn't exist", 'NOT_FOUND');
    }

    return defaulted(details.records[0].get('recipe'));
  });
};

export const getRecipe = async (id, ctx) => {
  return ctx.transaction(async tx => {
    const recipeResult = await tx.run(
      `
        MATCH (recipe:Recipe {id: $id}) RETURN recipe { ${RECIPE_FIELDS} }
      `,
      { id },
    );

    if (recipeResult.records.length === 0) {
      return null;
    }

    return defaulted(recipeResult.records[0].get('recipe'));
  });
};

export const listRecipes = async (
  { offset, count } = { offset: 0, count: 25 },
  ctx,
) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (recipe:Recipe)
        WHERE recipe.published = true
        RETURN recipe { ${RECIPE_FIELDS} }
        ORDER BY coalesce(recipe.views, 0) DESC
        SKIP $offset LIMIT $count
      `,
      { offset, count },
    );

    return result.records.map(rec => defaulted(rec.get('recipe')));
  });
};

export const listRecipesForIngredient = async (
  ingredientId,
  { offset, count },
  ctx,
) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (ingredient:Ingredient { id: $ingredientId })-[:USED_IN]->()-[:INGREDIENT_OF]->(recipe:Recipe)
        WHERE recipe.published = true
        RETURN recipe { ${RECIPE_FIELDS} }
        SKIP $offset LIMIT $count
      `,
      {
        ingredientId,
        offset,
        count,
      },
    );

    return result.records.map(rec => defaulted(rec.get('recipe')));
  });
};

export const publishRecipe = async (id, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (recipe:Recipe { id: $id })<-[:AUTHOR_OF]-(:User {id: $userId})
        SET recipe.published = true, recipe.updatedAt = $time
        RETURN recipe {${RECIPE_FIELDS}}
      `,
      { id, time: timestamp(), userId: ctx.user.id },
    );

    if (!result.records[0]) {
      throw new ApolloError("That recipe doesn't exist", 'NOT_FOUND');
    }

    return defaulted(result.records[0].get('recipe'));
  });
};

export const listRecipesForUser = async (userId, { offset, count }, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (user:User { id: $userId })-[:AUTHOR_OF]->(recipe:Recipe)
        WHERE recipe.published = true
        RETURN recipe { ${RECIPE_FIELDS} }
        SKIP $offset LIMIT $count
      `,
      {
        userId,
        offset,
        count,
      },
    );

    return result.records.map(rec => defaulted(rec.get('recipe')));
  });
};

export const listDiscoveredRecipesForUser = async (
  userId,
  { offset, count },
  ctx,
) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (user:User { id: $userId })-[:DISCOVERER_OF]->(recipe:Recipe)
        WHERE recipe.published = true
        RETURN recipe { ${RECIPE_FIELDS} }
        SKIP $offset LIMIT $count
      `,
      {
        userId,
        offset,
        count,
      },
    );

    return result.records.map(rec => defaulted(rec.get('recipe')));
  });
};

export const listDraftRecipesForUser = async (
  userId,
  { offset, count },
  ctx,
) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (user:User { id: $userId })-[:AUTHOR_OF]->(recipe:Recipe)
        WHERE coalesce(recipe.published, false) = false
        RETURN recipe { ${RECIPE_FIELDS} }
        SKIP $offset LIMIT $count
      `,
      {
        userId,
        offset,
        count,
      },
    );

    return result.records.map(rec => defaulted(rec.get('recipe')));
  });
};

export const listLikedRecipesForUser = async (
  userId,
  { offset, count },
  ctx,
) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (user:User { id: $userId })-[:LIKES]->(recipe:Recipe)
        RETURN recipe { ${RECIPE_FIELDS} }
        SKIP $offset LIMIT $count
      `,
      {
        userId,
        offset,
        count,
      },
    );

    return result.records.map(rec => defaulted(rec.get('recipe')));
  });
};

export const recordRecipeView = (id, ctx) =>
  ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (r:Recipe { id: $id })
      WITH r,
        CASE WHEN datetime(coalesce(r.viewedAt, '2018-08-31T00:00:00')) + duration("PT1M") < datetime($time) THEN 1 ELSE 0 END as increment
      SET r.views = coalesce(r.views, 0) + increment, r.viewedAt = $time
      RETURN r { ${RECIPE_FIELDS} }
    `,
      {
        id,
        time: timestamp(),
      },
    );

    return defaulted(result.records[0].get('r'));
  });
