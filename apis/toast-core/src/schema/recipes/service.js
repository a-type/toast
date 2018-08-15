import { pick } from 'ramda';
import { id } from 'tools';
import gcloudStorage from 'services/gcloudStorage';

export const RECIPE_FIELDS =
  '.id, .title, .description, .attribution, .sourceUrl, .published';
export const DEFAULTS = {
  title: 'Untitled',
  published: false
};

const defaulted = recipe =>
  Object.keys(DEFAULTS).reduce(
    (acc, key) =>
      recipe[key] !== null ? acc : { ...acc, [key]: DEFAULTS[key] },
    recipe
  );

export const createRecipe = async (user, input, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    `
      CREATE (r:Recipe {title: $input.title, description: $input.description, id: $id, published: false}),
        (r)<-[:AUTHOR_OF]-(u:User {id: $userId})
      RETURN r {${RECIPE_FIELDS}}
    `,
    {
      input: pick(['title', 'description', 'attribution', 'sourceUrl'], input),
      id: id(input.title),
      userId: user.id
    }
  );

  const recipe = result.records[0].get('r');

  return defaulted(recipe);
};

export const updateRecipeDetails = async (id, input, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const details = await tx.run(
      `
      MATCH (recipe:Recipe {id: $id})
      SET recipe += $input
      RETURN recipe { ${RECIPE_FIELDS} };
    `,
      {
        id,
        input: pick(['title', 'description', 'attribution', 'sourceUrl'], input)
      }
    );

    if (details.records.length === 0) {
      throw new Error("That recipe doesn't exist");
    }

    return defaulted(details.records[0].get('recipe'));
  });
};

export const getRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  return session.readTransaction(async tx => {
    const recipeResult = await tx.run(
      `
        MATCH (recipe:Recipe {id: $id}) RETURN recipe { ${RECIPE_FIELDS} }
      `,
      { id }
    );

    if (recipeResult.records.length === 0) {
      return null;
    }

    return defaulted(recipeResult.records[0].get('recipe'));
  });
};

export const listRecipes = async (
  { offset, count } = { offset: 0, count: 25 },
  ctx
) => {
  const session = ctx.getSession();
  return session.readTransaction(async tx => {
    const result = await tx.run(
      `
        MATCH (recipe:Recipe)
        RETURN recipe { ${RECIPE_FIELDS} }
        SKIP $offset LIMIT $count
      `,
      { offset, count }
    );

    return result.records.map(rec => defaulted(rec.get('recipe')));
  });
};

export const listRecipesForIngredient = async (
  ingredientId,
  { offset, count },
  ctx
) => {
  const session = ctx.getSession();
  return session.readTransaction(async tx => {
    const result = await tx.run(
      `
        MATCH (ingredient:Ingredient { id: $ingredientId })-[:INGREDIENT_OF]->(recipe:Recipe)
        RETURN recipe { ${RECIPE_FIELDS} }
        SKIP $offset LIMIT $count
      `,
      {
        ingredientId,
        offset,
        count
      }
    );

    return result.records.map(rec => defaulted(rec.get('recipe')));
  });
};

export const publishRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
        MATCH (recipe:Recipe { id: $id })
        SET recipe.published = true
        RETURN recipe {${RECIPE_FIELDS}}
      `,
      { id }
    );

    if (!result.records[0]) {
      throw new Error('No such recipe');
    }

    return defaulted(result.records[0].get('recipe'));
  });
};

export const listRecipesForUser = async (userId, { offset, count }, ctx) => {
  const session = ctx.getSession();
  return session.readTransaction(async tx => {
    const result = await tx.run(
      `
        MATCH (user:User { id: $userId })-[:AUTHOR_OF]->(recipe:Recipe)
        RETURN recipe { ${RECIPE_FIELDS} }
        SKIP $offset LIMIT $count
      `,
      {
        userId,
        offset,
        count
      }
    );

    return result.records.map(rec => defaulted(rec.get('recipe')));
  });
};
