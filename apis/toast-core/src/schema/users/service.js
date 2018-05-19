export const getRecipeAuthor = async (id, ctx) => {
  const session = ctx.getSession();

  const author = await session.run(
    `
      MATCH (u:User)-[:AUTHOR_OF]->(:Recipe {id: $id})
      RETURN u {.id, .name, .username}
    `,
    { id }
  );

  return author.records.length > 0 ? author.records[0].get('u') : null;
};
