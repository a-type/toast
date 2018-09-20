import uuid from 'uuid';
import { id } from 'tools';
import { RECIPE_FIELDS } from '../service';
import { INGREDIENT_FIELDS } from '../../ingredients/service';
import { pick } from 'ramda';
import parse from './parseIngredient';
import { searchIngredients_withTransaction } from '../../search/service';
import { ForbiddenError, ApolloError } from 'apollo-server-express';

export const RECIPE_INGREDIENT_FIELDS =
  '.id, .index, .unit, .unitTextMatch, .value, .valueTextMatch, .ingredientTextMatch, .text';
const UNKNOWN_INGREDIENT = 'unknown-0000';

const DEFAULTS = {
  text: '',
  value: 1,
};

const defaulted = recipeIngredient =>
  Object.keys(DEFAULTS).reduce(
    (acc, key) =>
      recipeIngredient[key] !== null ? acc : { ...acc, [key]: DEFAULTS[key] },
    recipeIngredient,
  );

const checkAccess = async (tx, recipeIngredientId, ctx) => {
  if (ctx.roles.includes('admin')) {
    return true;
  }

  const result = await tx.run(
    `
    MATCH (:Ingredient)-[:INGREDIENT_OF {id: $id}]-(:Recipe)<-[:AUTHOR_OF]-(u:User {id: $userId})
    RETURN u;
    `,
    {
      id: recipeIngredientId,
      userId: ctx.user.id,
    },
  );

  if (!result.records.length) {
    throw new ForbiddenError("You can't update this");
  }
};

export const getForRecipe = (id, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (ingredient:Ingredient)-[rel:INGREDIENT_OF]->(:Recipe {id: $id})
      RETURN rel {${RECIPE_INGREDIENT_FIELDS}}, ingredient {${INGREDIENT_FIELDS}} ORDER BY rel.index
    `,
      { id },
    );

    return result.records.map(record =>
      defaulted({
        ...record.get('rel'),
        ingredient: record.get('ingredient'),
      }),
    );
  });
};

export const getRecipeIngredient = (id, ctx) => {
  return ctx.transaction(tx => {
    return getRecipeIngredient_withTransaction(id, tx);
  });
};

export const getRecipeIngredient_withTransaction = async (id, tx) => {
  const result = await tx.run(
    `
    MATCH ()<-[rel:INGREDIENT_OF {id: $id}]-(i:Ingredient)
    RETURN rel {${RECIPE_INGREDIENT_FIELDS}}, i {${INGREDIENT_FIELDS}}
    `,
    { id },
  );

  return result.records.length
    ? defaulted({
        ...result.records[0].get('rel'),
        ingredient: result.records[0].get('i'),
      })
    : null;
};

export const parseRecipeIngredient = (recipeId, input, ctx) => {
  return ctx.transaction(async tx => {
    return parseRecipeIngredient_withTransaction(recipeId, input, tx);
  });
};

export const parseRecipeIngredientText = async (text, tx) => {
  const { value, unit, ingredient } = parse(text);

  const ingredientResults = await searchIngredients_withTransaction(
    ingredient.normalized,
    tx,
  );

  let foundIngredient = ingredientResults.items[0];

  if (!foundIngredient) {
    const createResult = await tx.run(
      `
        CREATE (i:Ingredient {id: $id, name: $name})
        RETURN i {${INGREDIENT_FIELDS}}
      `,
      {
        id: id(ingredient.normalized),
        name: ingredient.normalized,
      },
    );

    if (!createResult.records.length) {
      throw new Error('Failed to create ingredient for recipe');
    }

    foundIngredient = createResult.records[0].get('i');
  }

  return {
    unit: unit.normalized,
    unitTextMatch: unit.raw,
    value: value.normalized,
    valueTextMatch: value.raw || 1,
    ingredientId: foundIngredient.id,
    ingredientTextMatch: ingredient.raw,
  };
};

// TODO: find a better way to break up and reuse behavior
export const parseRecipeIngredient_withTransaction = async (
  recipeId,
  input,
  tx,
) => {
  const parsed = await parseRecipeIngredientText(input.text, tx);

  const result = await tx.run(
    `
      MATCH (recipe:Recipe {id: $id}), (ingredient:Ingredient {id: $ingredientId})
      OPTIONAL MATCH (recipe)<-[allIngredients:INGREDIENT_OF]-()
      WITH recipe, count(allIngredients) as index, ingredient
      CREATE (recipe)<-[rel:INGREDIENT_OF {
        id: $relId,
        index: index,
        unit: $unit,
        unitTextMatch: $unitTextMatch,
        value: $value,
        valueTextMatch: $valueTextMatch,
        ingredientTextMatch: $ingredientTextMatch,
        text: $text
      }]-(ingredient)
      RETURN recipe {${RECIPE_FIELDS}}
      `,
    {
      text: input.text,
      ...parsed,
      id: recipeId,
      relId: uuid(),
    },
  );

  if (result.records.length) {
    return result.records[0].get('recipe');
  }
};

export const reparseRecipeIngredient = async (id, input, ctx) => {
  return ctx.transaction(async tx => {
    await checkAccess(tx, id, ctx);

    const parsed = await parseRecipeIngredientText(input.text, tx);

    return updateRecipeIngredient_withTransaction(id, parsed, tx, ctx);
  });
};

const changeIngredientRelationship = (id, userId, ingredientId, tx) => {
  return tx.run(
    `
    MATCH (:User {id: $userId})-[:AUTHOR_OF]->(recipe:Recipe)<-[rel:INGREDIENT_OF {id: $relId}]-(),
      (ingredient:Ingredient {id: $ingredientId})
    CALL apoc.refactor.from(rel, ingredient) YIELD input, output, error
    RETURN error
    `,
    {
      relId: id,
      userId,
      ingredientId,
    },
  );
};

export const updateRecipeIngredient = (id, args, ctx) => {
  return ctx.transaction(async tx => {
    await checkAccess(tx, id, ctx);

    return updateRecipeIngredient_withTransaction(id, args, tx, ctx);
  });
};

export const updateRecipeIngredient_withTransaction = async (
  id,
  args,
  tx,
  ctx,
) => {
  if (args.ingredientId) {
    await changeIngredientRelationship(id, ctx.user.id, args.ingredientId, tx);
  }
  const result = await tx.run(
    `
    MATCH (recipe:Recipe)<-[rel:INGREDIENT_OF {id: $relId}]-(ing:Ingredient)
    SET rel += $ingredientProps
    RETURN rel {${RECIPE_INGREDIENT_FIELDS}}, ing {${INGREDIENT_FIELDS}}
  `,
    {
      relId: id,
      ingredientProps: args,
      userId: ctx.user.id,
    },
  );

  if (result.records.length) {
    const rel = result.records[0].get('rel');
    return defaulted({
      ...rel,
      ingredient: result.records[0].get('ing'),
    });
  } else {
    throw new ApolloError('No such recipe ingredient exists', 'NOT_FOUND');
  }
};

export const moveRecipeIngredient = (recipeId, args, ctx) => {
  return ctx.transaction(async tx => {
    await checkAccess(tx, id, ctx);

    const ingredientsResult = await tx.run(
      `
      MATCH (recipe:Recipe {id: $id})<-[rel:INGREDIENT_OF]-(ingredient:Ingredient)
      RETURN rel {.index}, ingredient {.id} ORDER BY rel.index
      `,
      {
        id: recipeId,
      },
    );

    if (
      ingredientsResult.records.length > Math.max(args.fromIndex, args.toIndex)
    ) {
      const ingredientIds = ingredientsResult.records.map(
        rec => rec.get('ingredient').id,
      );
      ingredientIds.splice(
        args.toIndex,
        0,
        ingredientIds.splice(args.fromIndex, 1)[0],
      );
      const indexAndIds = ingredientIds.map((id, idx) => ({
        id,
        index: idx,
      }));
      await tx.run(
        `
        UNWIND $indexAndIds as indexAndUuid
        MATCH (:Recipe {id: $id})<-[rel:INGREDIENT_OF]-(:Ingredient {id: indexAndUuid.id})
        SET rel.index = indexAndUuid.index
        `,
        { indexAndIds, id: recipeId },
      );
    }

    const recipeResult = await tx.run(
      `MATCH (r:Recipe {id: $id}) RETURN r {${RECIPE_FIELDS}}`,
      { id: recipeId },
    );
    return recipeResult.records[0].get('r');
  });
};

export const deleteRecipeIngredient = (id, ctx) => {
  return ctx.transaction(async tx => {
    await checkAccess(tx, id, ctx);

    const result = await tx.run(
      `
      MATCH (recipe:Recipe)<-[rel:INGREDIENT_OF {id: $id}]-()
      DELETE rel
      RETURN recipe {${RECIPE_FIELDS}}
      `,
      {
        id,
        userId: ctx.user.id,
      },
    );

    if (result.records.length) {
      return result.records[0].get('recipe');
    }
  });
};
