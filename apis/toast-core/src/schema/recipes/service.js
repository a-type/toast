import { pick } from 'ramda';
import uuid from 'uuid';
import gcloudStorage from 'services/gcloudStorage';

export const createRecipe = async (user, { title, description }, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    `
      CREATE (r:Recipe {title: $title, description: $description, id: $id}),
        (r)<-[:AUTHOR_OF]-(u:User {id: $userId})
      RETURN r {.id, .title, .description}, u {.id, .name, .username}
    `,
    {
      title,
      description,
      id: uuid(),
      userId: user.id
    }
  );

  const recipe = result.records[0].get('r');
  const author = result.records[0].get('u');

  return {
    ...recipe,
    author
  };
};

export const updateRecipeDetails = async (args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const details = await tx.run(
      `
      MATCH (recipe:Recipe {id: $id})
      SET recipe += $input
      RETURN recipe {.id, .title, .description};
    `,
      { id: args.id, input: pick(['title', 'description'], args.input) }
    );

    if (details.records.length === 0) {
      throw new Error("That recipe doesn't exist");
    }

    if (args.input.coverImage) {
      const file = await args.input.coverImage.file;
      const uploaded = await gcloudStorage.upload(file, 'images');
      await tx.run(
        `
        MATCH (r:Recipe {id: $id})
        MERGE (r)-[:COVER_IMAGE]->(:Image {id: $imageId, url: $url})
        `,
        { id: args.id, imageId: uploaded.id, url: uploaded.url }
      );
    }

    return details.records[0].get('recipe');
  });
};

export const getRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  const recipeResult = await session.run(
    `
      MATCH (recipe:Recipe {id: $id}) RETURN recipe { .id, .title, .description }
    `,
    { id }
  );

  if (recipeResult.records.length === 0) {
    return null;
  }

  return recipeResult.records[0].get('recipe');
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
        RETURN recipe { .id, .title, .description }
        SKIP $offset LIMIT $count
      `,
      { offset, count }
    );

    return result.records.map(rec => rec.get('recipe'));
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
        RETURN recipe { .id, .title, .description }
        SKIP $offset LIMIT $count
      `,
      {
        ingredientId,
        offset,
        count
      }
    );

    return result.records.map(rec => rec.get('recipe'));
  });
};
