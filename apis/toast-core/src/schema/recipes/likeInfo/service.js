import { id } from 'tools';
import { RECIPE_FIELDS } from '../service';

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

export const likeRecipe = (id, ctx) =>
  ctx.transaction(async tx => {
    const result = await tx.run(
      `
    MATCH (r:Recipe { id: $id }), (u:User { id: $userId })
    MERGE (r)<-[l:LIKES]-(u)
    SET l.id = $likeId, l.likedAt = $likedAt
    RETURN l { ${LIKE_INFO_FIELDS} }
    `,
      { id, userId: ctx.user.id, likedAt: timestamp(), likeId: id() },
    );

    return defaulted(result.records[0].get('r'));
  });

export const unlikeRecipe = (id, ctx) =>
  ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (r:Recipe { id: $id })<-[l:LIKES]-(:User { id: $userId })
      DELETE l
      RETURN r { ${RECIPE_FIELDS} }
      `,
      {
        id: id,
        userId: ctx.user.id,
      },
    );

    if (!result.records.length) {
      return null;
    }

    return result.records[0].get('r');
  });
