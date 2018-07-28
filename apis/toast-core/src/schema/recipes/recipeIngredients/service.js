import uuid from 'uuid';
import { RECIPE_FIELDS } from '../service';
import { pick } from 'ramda';

export const RECIPE_INGREDIENT_FIELDS = '.id, .index, .unit, .unitValue, .note';
export const INGREDIENT_FIELDS = '.id, .name, .description';

export const getForRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    `
    MATCH (ingredient:Ingredient)-[rel:INGREDIENT_OF]->(:Recipe {id: $id})
    RETURN rel {${RECIPE_INGREDIENT_FIELDS}}, ingredient {${INGREDIENT_FIELDS}} ORDER BY rel.index
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
      RETURN recipe {${RECIPE_FIELDS}}
      `,
      {
        id: recipeId,
        ingredientId: args.ingredientId,
        relId: uuid(),
        unit: args.unit || null,
        unitValue: args.unitValue,
        note: args.note
      }
    );

    if (result.records.length) {
      return result.records[0].get('recipe');
    }
  });
};

export const updateRecipeIngredient = async (id, args, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
      MATCH (:User {id: $userId })-[:AUTHOR_OF]->(recipe:Recipe)<-[rel:INGREDIENT_OF {id: $relId}]-(ing:Ingredient)
      SET rel += $ingredientProps
      RETURN rel {${RECIPE_INGREDIENT_FIELDS}}, ing {${INGREDIENT_FIELDS}}
    `,
      {
        relId: id,
        ingredientProps: pick(['unit', 'unitValue', 'note'], args),
        userId: ctx.user.id
      }
    );

    if (result.records.length) {
      const rel = result.records[0].get('rel');
      return {
        ...rel,
        ingredient: result.records[0].get('ing')
      };
    } else {
      throw new Error('No such recipe ingredient exists');
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
      `MATCH (r:Recipe {id: $id}) RETURN r {${RECIPE_FIELDS}}`,
      { id: recipeId }
    );
    return recipeResult.records[0].get('r');
  });
};
