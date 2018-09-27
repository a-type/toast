export const getLikeCountForRecipe = (id, ctx) => {
  ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (:Recipe {id: $id}<-[l:LIKES]-())
      RETURN COUNT(l) as count
      `,
      { id },
    );

    return result.records[0].get('count');
  });
};
