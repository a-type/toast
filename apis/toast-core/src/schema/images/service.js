export const getRecipeCoverImage = async (id, ctx) => {
  const session = ctx.getSession();
  const coverImage = await session.run(
    `
      MATCH (i:Image)<-[:COVER_IMAGE]-(:Recipe {id: $id})
      RETURN i {.id, .url}
    `,
    { id }
  );

  return coverImage.records.length > 0 ? coverImage.records[0].get('i') : null;
};
