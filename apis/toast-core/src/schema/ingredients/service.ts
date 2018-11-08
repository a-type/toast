import { id, timestamp } from 'tools';
import { ApolloError } from 'apollo-server-express';
import { pick } from 'ramda';
export const INGREDIENT_FIELDS = `.id, .name, .description, .attribution, .alternateNames`;

const DEFAULTS = {
  alternateNames: [],
};

export const defaulted = ingredient =>
  Object.keys(DEFAULTS).reduce(
    (acc, key) =>
      ingredient[key] !== null ? acc : { ...acc, [key]: DEFAULTS[key] },
    ingredient,
  );

export const listIngredients = (
  { offset = 0, count = 10 } = { offset: 0, count: 10 },
  { by = 'createdAt', order = 'DESC' } = { by: 'createdAt', order: 'DESC' },
  ctx,
) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (ingredient:Ingredient)
        RETURN ingredient { ${INGREDIENT_FIELDS} }
        ORDER BY ingredient.${by} ${order}
        SKIP $offset LIMIT $count
      `,
      { offset, count },
    );

    return result.records.map(rec => defaulted(rec.get('ingredient')));
  });
};

export const getIngredient = (id, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (ingredient:Ingredient { id: $id })
        RETURN ingredient { ${INGREDIENT_FIELDS} }
      `,
      { id },
    );

    if (result.records.length === 0) {
      return null;
    }

    return defaulted(result.records[0].get('ingredient'));
  });
};

export const createIngredient = (
  { name, description = null, attribution = null },
  ctx,
) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        CREATE (i:Ingredient $props)
        RETURN i {${INGREDIENT_FIELDS}}
      `,
      {
        props: {
          name: name.toLowerCase(),
          description: description || null,
          attribution,
          id: id(name),
          createdAt: timestamp(),
        },
      },
    );

    return defaulted(result.records[0].get('i'));
  });
};

export const updateIngredient = (id, input, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (ingredient:Ingredient { id: $id })
        SET ingredient += $input
        RETURN ingredient { ${INGREDIENT_FIELDS} }
      `,
      {
        id,
        input: pick(
          ['name', 'description', 'attribution', 'alternateNames'],
          input,
        ),
      },
    );

    if (result.records.length === 0) {
      throw new ApolloError("That ingredient doesn't exist", 'NOT_FOUND');
    }

    return defaulted(result.records[0].get('ingredient'));
  });
};

export const deleteIngredient = (id, ctx) => {
  return ctx.transaction(async tx => {
    await tx.run(
      `
        MATCH (ingredient:Ingredient { id: $id })
        DELETE ingredient
      `,
      { id },
    );

    return null;
  });
};

export const mergeIngredients = ({ primary, secondary }, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (secondary:Ingredient {id: $secondaryId}), (primary:Ingredient {id: $primaryId})
        WITH head(collect([primary, secondary])) as nodes, coalesce(primary.alternateNames, []) + coalesce(secondary.alternateNames, []) + secondary.name as newAlternateNames
        CALL apoc.refactor.mergeNodes(nodes, {properties: "discard"}) YIELD node
        SET node.alternateNames = newAlternateNames
        RETURN node {${INGREDIENT_FIELDS}}
      `,
      {
        primaryId: primary,
        secondaryId: secondary,
      },
    );

    if (!result.records.length) {
      throw new Error('Failed to merge ingredients');
    }

    return defaulted(result.records[0].get('node'));
  });
};

export const getIngredientForRecipeIngredient = (recipeIngredientId, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
        MATCH (:RecipeIngredient {id: $recipeIngredientId})<-[:USED_IN]-(ingredient:Ingredient)
        RETURN ingredient {${INGREDIENT_FIELDS}}
      `,
      {
        recipeIngredientId,
      },
    );

    return defaulted(result.records[0].get('ingredient'));
  });
};
