import { id, timestamp } from 'tools';

const LIKE_INFO_FIELDS = `.id, .likedAt`;

export const getForRecipe = (id, ctx) =>
  ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (:Recipe {id: $id})<-[l:LIKES]-(:User {id: $userId})
      RETURN l { ${LIKE_INFO_FIELDS}}
      `,
      { id, userId: ctx.user.id },
    );

    if (!result.records.length) {
      return null;
    }

    return result.records[0].get('l');
  });

export const likeRecipe = (recipeId, ctx) =>
  ctx.transaction(async tx => {
    const result = await tx.run(
      `
    MATCH (recipe:Recipe { id: $id }), (u:User { id: $userId })
    MERGE (recipe)<-[l:LIKES]-(u)
    SET l.id = $likeId, l.likedAt = $likedAt
    RETURN recipe { ${ctx.graph.recipes.dbFields} }
    `,
      { id: recipeId, userId: ctx.user.id, likedAt: timestamp(), likeId: id() },
    );

    return ctx.graph.recipes.hydrateOne(result);
  });

export const unlikeRecipe = (recipeId, ctx) =>
  ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (recipe:Recipe { id: $id })<-[l:LIKES]-(:User { id: $userId })
      DELETE l
      RETURN recipe { ${ctx.graph.recipes.dbFields} }
      `,
      {
        id: recipeId,
        userId: ctx.user.id,
      },
    );

    return ctx.graph.recipes.hydrateOne(result);
  });
