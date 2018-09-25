import uuid from 'uuid';
import { id, timestamp } from 'tools';
import { RECIPE_FIELDS } from '../service';
import { INGREDIENT_FIELDS } from '../../ingredients/service';
import { pick } from 'ramda';
import parse from './parseIngredient';
import {
  searchIngredients_withTransaction,
  normalizeTerm,
} from '../../search/service';
import { ForbiddenError, ApolloError } from 'apollo-server-express';
import stringSimilarity from 'string-similarity';

export const RECIPE_INGREDIENT_FIELDS =
  '.id, .unit, .unitTextMatch, .value, .valueTextMatch, .ingredientTextMatch, .text';
export const RELATIONSHIP_FIELDS = '.index';
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
  const result = await tx.run(
    `
    MATCH (:RecipeIngredient {id: $id})-[:INGREDIENT_OF]-(:Recipe)<-[:AUTHOR_OF]-(u:User {id: $userId})
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
      MATCH (recipeIngredient:RecipeIngredient)-[rel:INGREDIENT_OF]->(:Recipe {id: $id})
      RETURN recipeIngredient {${RECIPE_INGREDIENT_FIELDS}}, rel {${RELATIONSHIP_FIELDS}}
      ORDER BY rel.index
    `,
      { id },
    );

    return result.records.map(record =>
      defaulted({
        ...record.get('rel'),
        ...record.get('recipeIngredient'),
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
    MATCH (recipeIngredient:RecipeIngredient {id: $id})<-[rel:INGREDIENT_OF]-(i:Ingredient)
    RETURN recipeIngredient {${RECIPE_INGREDIENT_FIELDS}}, rel {${RELATIONSHIP_FIELDS}}
    `,
    { id },
  );

  return result.records.length
    ? defaulted({
        ...result.records[0].get('rel'),
        ...result.records[0].get('recipeIngredient'),
      })
    : null;
};

export const parseRecipeIngredient = (recipeId, input, ctx) => {
  return ctx.transaction(async tx => {
    return parseRecipeIngredient_withTransaction(recipeId, input, tx);
  });
};

const findClearIngredientWinner = ingredientSearchResult => {
  if (ingredientSearchResult.records.length === 0) {
    return null;
  }
  if (ingredientSearchResult.records.length === 1) {
    return ingredientSearchResult.records[0].get('node');
  }

  const weightOfFirstResult = ingredientSearchResult.records[0].get('weight');
  const weightOfSecondResult = ingredientSearchResult.records[1].get('weight');

  if (weightOfSecondResult / weightOfFirstResult < 0.85) {
    return ingredientSearchResult.records[0].get('node');
  }
};

const ensureIngredientCloseEnough = (searchTerm, ingredient) => {
  if (!ingredient) {
    return null;
  }
  const allComparisons = [ingredient.name, ...ingredient.alternateNames];
  const passed =
    allComparisons.reduce(
      (highest, name) =>
        Math.max(stringSimilarity.compareTwoStrings(searchTerm, name), highest),
      0,
    ) > 0.75;

  return passed ? ingredient : null;
};

export const parseRecipeIngredientText = async (text, tx) => {
  const { value, unit, ingredient } = parse(text);

  const ingredientResults = await tx.run(
    `
    CALL apoc.index.search("ingredients", $term) YIELD node, weight
    WITH node, weight
    RETURN node {${INGREDIENT_FIELDS}}, weight ORDER BY weight DESC LIMIT 10
    `,
    { term: `${normalizeTerm(ingredient.normalized)}~` },
  );

  let foundIngredient = ensureIngredientCloseEnough(
    ingredient.normalized,
    findClearIngredientWinner(ingredientResults),
  );

  if (!foundIngredient) {
    const createResult = await tx.run(
      `
        CREATE (i:Ingredient $props)
        RETURN i {${INGREDIENT_FIELDS}}
      `,
      {
        props: {
          id: id(ingredient.normalized),
          name: ingredient.normalized,
          createdAt: timestamp(),
        },
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
      OPTIONAL MATCH (recipe)<-[allRels:INGREDIENT_OF]-()
      WITH recipe, count(allRels) as index, ingredient
      CREATE (recipe)<-[rel:INGREDIENT_OF {index: index}]-(:RecipeIngredient {
        id: $relId,
        unit: $unit,
        unitTextMatch: $unitTextMatch,
        value: $value,
        valueTextMatch: $valueTextMatch,
        ingredientTextMatch: $ingredientTextMatch,
        text: $text
      })<-[:USED_IN]-(ingredient)
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

const changeIngredientRelationship_withTransaction = (id, ingredientId, tx) => {
  return tx.run(
    `
    MATCH (:RecipeIngredient {id: $relId})<-[rel:USED_IN]-(),
      (ingredient:Ingredient {id: $ingredientId})
    CALL apoc.refactor.from(rel, ingredient) YIELD input, output, error
    RETURN error
    `,
    {
      relId: id,
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
    await changeIngredientRelationship_withTransaction(
      id,
      args.ingredientId,
      tx,
    );
  }
  const result = await tx.run(
    `
    MATCH (recipe:Recipe)<-[rel:INGREDIENT_OF]-(recipeIngredient:RecipeIngredient {id: $relId})
    SET recipeIngredient += $ingredientProps
    RETURN recipeIngredient {${RECIPE_INGREDIENT_FIELDS}}, rel {${RELATIONSHIP_FIELDS}}
  `,
    {
      relId: id,
      ingredientProps: args,
      userId: ctx.user.id,
    },
  );

  if (result.records.length) {
    const rel = result.records[0].get('rel');
    const recipeIngredient = result.records[0].get('recipeIngredient');
    return defaulted({
      ...rel,
      ...recipeIngredient,
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
      MATCH (recipe:Recipe {id: $id})<-[rel:INGREDIENT_OF]-(recipeIngredient:RecipeIngredient)
      RETURN rel {.index}, recipeIngredient {.id} ORDER BY rel.index
      `,
      {
        id: recipeId,
      },
    );

    if (
      ingredientsResult.records.length > Math.max(args.fromIndex, args.toIndex)
    ) {
      const ingredientIds = ingredientsResult.records.map(
        rec => rec.get('recipeIngredient').id,
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
        MATCH (:Recipe {id: $id})<-[rel:INGREDIENT_OF]-(:RecipeIngredient {id: indexAndUuid.id})
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
      MATCH (recipe:Recipe)<-[rel:INGREDIENT_OF]-(recipeIngredient:RecipeIngredient {id: $id})
      DETACH DELETE recipIngredient
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
