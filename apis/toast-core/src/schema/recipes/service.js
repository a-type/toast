import { pick, omit } from 'ramda';
import { id } from 'tools';
import gcloudStorage from 'services/gcloudStorage';
import { parseRecipeIngredient_withTransaction } from './recipeIngredients/service';

export const RECIPE_FIELDS =
  '.id, .title, .description, .attribution, .sourceUrl, .published, .displayType';
export const DEFAULTS = {
  title: 'Untitled',
  published: false,
  displayType: 'LINK',
};

const defaulted = recipe =>
  Object.keys(DEFAULTS).reduce(
    (acc, key) =>
      recipe[key] !== null ? acc : { ...acc, [key]: DEFAULTS[key] },
    recipe,
  );

export const createRecipe = async (input, ctx) => {
  const user = ctx.user;

  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      CREATE (r:Recipe $input),
        (r)<-[:AUTHOR_OF]-(u:User {id: $userId})
      RETURN r {${RECIPE_FIELDS}}
    `,
      {
        input: { ...input, displayType: 'FULL', published: false },
        id: id(input.title),
        userId: user.id,
      },
    );

    const recipe = result.records[0].get('r');

    return defaulted(recipe);
  });
};

export const linkRecipe = async (input, ctx) => {
  const user = ctx.user;

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
      WITH r
      MERGE (r)<-[:DISCOVERER_OF]-(u:User {id: $userId})
      RETURN r {${RECIPE_FIELDS}}
    `,
      {
        sourceUrl: input.sourceUrl,
        input: {
          ...omit(['ingredientStrings'], input),
          displayType: 'LINK',
          published: true,
        },
        id: id(input.title),
        userId: user.id,
      },
    );

    const recipe = result.records[0].get('r');

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
      MATCH (recipe:Recipe {id: $id})
      SET recipe += $input
      RETURN recipe { ${RECIPE_FIELDS} };
    `,
      {
        id,
        input: pick(
          ['title', 'description', 'attribution', 'sourceUrl'],
          input,
        ),
      },
    );

    if (details.records.length === 0) {
      throw new Error("That recipe doesn't exist");
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
        RETURN recipe { ${RECIPE_FIELDS} }
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
        MATCH (ingredient:Ingredient { id: $ingredientId })-[:INGREDIENT_OF]->(recipe:Recipe)
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
        MATCH (recipe:Recipe { id: $id })
        SET recipe.published = true
        RETURN recipe {${RECIPE_FIELDS}}
      `,
      { id },
    );

    if (!result.records[0]) {
      throw new Error('No such recipe');
    }

    return defaulted(result.records[0].get('recipe'));
  });
};

export const listRecipesForUser = async (userId, { offset, count }, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (user:User { id: $userId })-[:AUTHOR_OF]->(recipe:Recipe)
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
