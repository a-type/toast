import {
  defaulted as ingredientDefaulted,
  INGREDIENT_FIELDS,
} from '../ingredients/service';

export const normalizeTerm = term => term.replace(/[^a-zA-Z0-9 -]/, '');

export const searchRecipes = async ({ term, ingredients }, ctx) => {
  if (!term && !ingredients) {
    return {
      items: [],
    };
  }

  // FIXME: this is probably possible to express as a single query!

  if (term && term.length > 0 && !ingredients) {
    return ctx.transaction(async tx => {
      const result = await tx.run(
        `
        CALL apoc.index.search("recipes", $term) YIELD node, weight
        WITH node as recipe, weight
        WHERE recipe.published = true
        WITH recipe, weight
        RETURN recipe {${
          ctx.graph.recipes.dbFields
        }} ORDER BY weight DESC SKIP $offset LIMIT $count
      `,
        {
          term: `${normalizeTerm(term)}~`,
          offset: 0,
          count: 100,
        },
      );

      return { items: ctx.graph.recipes.hydrateList(result) };
    });
  } else if (!term && ingredients) {
    const { include = [], exclude = [] } = ingredients;
    return ctx.transaction(async tx => {
      const result = await tx.run(
        `
      MATCH (recipe:Recipe)
      WHERE none(x in $exclude WHERE exists((recipe)<-[:INGREDIENT_OF]-(:Ingredient {id: x})))
      AND all(c in $include WHERE exists((recipe)<-[:INGREDIENT_OF]-(:Ingredient {id: c})))
      AND recipe.published = true
      WITH recipe
      RETURN recipe {${ctx.graph.recipes.dbFields}} SKIP $offset LIMIT $count;
      `,
        { include, exclude, offset: 0, count: 100 },
      );
      return { items: ctx.graph.recipes.hydrateList(result) };
    });
  } else {
    const { include = [], exclude = [] } = ingredients;
    return ctx.transaction(async tx => {
      const result = await tx.run(
        `
      CALL apoc.index.search("recipes", $term) YIELD node, weight
      WITH node as recipe, weight
      WHERE none(x in $exclude WHERE exists((recipe)<-[:INGREDIENT_OF]-(:Ingredient {id: x})))
      AND all(c in $include WHERE exists((recipe)<-[:INGREDIENT_OF]-(:Ingredient {id: c})))
      AND recipe.published = true
      WITH recipe, weight
      RETURN recipe {${
        ctx.graph.recipes.dbFields
      }} ORDER BY weight DESC SKIP $offset LIMIT $count;
      `,
        {
          term: `${normalizeTerm(term)}~`,
          include,
          exclude,
          offset: 0,
          count: 100,
        },
      );
      return { items: ctx.graph.recipes.hydrateList(result) };
    });
  }
};

export const searchIngredients = async (term, ctx) => {
  if (!term || term.length === 0) {
    return {
      items: [],
    };
  }

  return ctx.transaction(tx => {
    return searchIngredients_withTransaction(term, tx);
  });
};

export const searchIngredients_withTransaction = async (term, tx) => {
  if (!term || term.length === 0) {
    return {
      items: [],
    };
  }
  const result = await tx.run(
    `
    CALL apoc.index.search("ingredients", $term) YIELD node, weight
    WITH node, weight
    RETURN node {${INGREDIENT_FIELDS}} ORDER BY weight DESC LIMIT 10
    `,
    { term: `${normalizeTerm(term)}~` },
  );

  if (result.records.length === 0) {
    return {
      items: [],
    };
  }

  return {
    items: result.records.map(record =>
      ingredientDefaulted(record.get('node')),
    ),
  };
};
