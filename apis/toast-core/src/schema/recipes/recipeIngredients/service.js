import uuid from 'uuid';

export const getForRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    `
    MATCH (ingredient:Ingredient)-[rel:INGREDIENT_OF]->(:Recipe {id: $id})
    RETURN rel { .id, .index, .unit, .unitValue, .note }, ingredient { .name, .description, .id } ORDER BY rel.index
  `,
    { id }
  );

  return result.records.map(record => ({
    ...record.get('rel'),
    ingredient: record.get('ingredient')
  }));
};

export const createRecipeIngredient = async (recipeId, args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH (recipe:Recipe {id: $id}), (ingredient:Ingredient {id: $ingredientId})
      OPTIONAL MATCH (recipe)<-[allIngredients:INGREDIENT_OF]-()
      WITH recipe, count(allIngredients) as index, ingredient
      CREATE (recipe)<-[rel:INGREDIENT_OF {id: $relId, index: index, unit: $unit, unitValue: $unitValue}]-(ingredient)
      RETURN rel {.id, .index, .unit, .unitValue, .note}
      `,
      {
        id: recipeId,
        ingredientId: args.ingredientId,
        relId: uuid(),
        unit: args.unit,
        unitValue: args.unitValue,
        note: args.note
      }
    );

    if (result.records.length) {
      return result.records[0].get('rel');
    }
  });
};

export const updateRecipeIngredient = async (id, args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH ()<-[rel:INGREDIENT_OF {id: $relId}]-()
      SET rel += $ingredientProps
      RETURN rel {.id, .index, .unit, .unitValue, .note}
    `,
      {
        relId: id,
        ingredientProps: pick(['unit', 'unitValue', 'note'], args)
      }
    );

    if (result.records.length) {
      return result.records[0].get('rel');
    }
  });
};

export const moveRecipeIngredient = async (recipeId, args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const ingredientsResult = await tx.run(
      `
      MATCH (recipe:Recipe {id: $id})<-[rel:INGREDIENT_OF]-(ingredient:Ingredient)
      RETURN rel {.index}, ingredient {.id} ORDER BY rel.index
      `,
      {
        id: recipeId
      }
    );

    if (
      ingredientsResult.records.length > Math.max(args.fromIndex, args.toIndex)
    ) {
      const ingredientIds = ingredientsResult.records.map(
        rec => rec.get('ingredient').id
      );
      ingredientIds.splice(
        args.toIndex,
        0,
        ingredientIds.splice(args.fromIndex, 1)[0]
      );
      const indexAndIds = ingredientIds.map((id, idx) => ({
        id,
        index: idx
      }));
      await tx.run(
        `
        UNWIND $indexAndIds as indexAndUuid
        MATCH (:Recipe {id: $id})<-[rel:INGREDIENT_OF]-(:Ingredient {id: indexAndUuid.id})
        SET rel.index = indexAndUuid.index
        `,
        { indexAndIds, id: recipeId }
      );
    }

    const recipeResult = await tx.run(
      `MATCH (r:Recipe {id: $id}) RETURN r {.id, .title, .description}`,
      { id: recipeId }
    );
    return recipeResult.records[0].get('r');
  });
};
