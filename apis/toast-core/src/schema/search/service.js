export const searchRecipes = async ({ term, ingredients }, ctx) => {
  const session = ctx.getSession();

  if (!term && !ingredients) {
    return {
      items: [],
      total: 0
    };
  }

  const processResult = result => {
    if (result.records.length === 0) {
      return {
        items: [],
        total: 0
      };
    }

    return {
      items: result.records.map(record => record.get('r')),
      total: result.records[0].get('total')
    };
  };

  // FIXME: this is probably possible to express as a single query!

  if (term && term.length > 0 && !ingredients) {
    const result = await session.run(
      `
        CALL apoc.index.search("recipes", $term) YIELD node, weight
        WITH node as r, weight, count(node) as total
        RETURN total, r {.id, .title, .description} ORDER BY weight DESC SKIP $offset LIMIT $count
      `,
      {
        term: `${term}~`,
        offset: 0,
        count: 100
      }
    );

    return processResult(result);
  } else if (!term && ingredients) {
    const { include = [], exclude = [] } = ingredients;
    const result = await session.run(
      `
      MATCH (r:Recipe)
      WHERE none(x in $exclude WHERE exists((r)<-[:INGREDIENT_OF]-(:Ingredient {id: x})))
      AND all(c in $include WHERE exists((r)<-[:INGREDIENT_OF]-(:Ingredient {id: c})))
      WITH r, count(r) as total
      RETURN total, r {.id, .title, .description} SKIP $offset LIMIT $count;
      `,
      { include, exclude, offset: 0, count: 100 }
    );
    return processResult(result);
  } else {
    const { include = [], exclude = [] } = ingredients;
    const result = await session.run(
      `
      CALL apoc.index.search("recipes", $term) YIELD node, weight
      WITH node as r, weight
      WHERE none(x in $exclude WHERE exists((r)<-[:INGREDIENT_OF]-(:Ingredient {id: x})))
      AND all(c in $include WHERE exists((r)<-[:INGREDIENT_OF]-(:Ingredient {id: c})))
      WITH r, count(r) as total, weight
      RETURN total, r {.id, .title, .description} ORDER BY weight DESC SKIP $offset LIMIT $count;
      `,
      { term: `${term}~`, include, exclude, offset: 0, count: 100 }
    );
    return processResult(result);
  }
};

export const searchIngredients = async (term, ctx) => {
  if (!term || term.length === 0) {
    return {
      items: [],
      total: 0
    };
  }

  const session = ctx.getSession();

  const result = await session.run(
    `
    CALL apoc.index.search("ingredients", $term) YIELD node, weight
    WITH node, weight, count(node) as total
    RETURN total, node {.id, .name, .description} ORDER BY weight DESC LIMIT 10
    `,
    { term: `${term}~` }
  );

  if (result.records.length === 0) {
    return {
      items: [],
      total: 0
    };
  }

  return {
    items: result.records.map(record => record.get('node')),
    total: result.records[0].get('total')
  };
};
