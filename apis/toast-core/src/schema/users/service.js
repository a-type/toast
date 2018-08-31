export const getRecipeAuthor = (id, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (u:User)-[:AUTHOR_OF]->(:Recipe {id: $id})
      RETURN u {.id, .name, .username}
    `,
      { id },
    );

    return result.records.length ? result.records[0].get('u') : null;
  });
};

export const getRecipeDiscoverer = (id, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (u:User)-[:DISCOVERER_OF]->(:Recipe {id: $id})
      RETURN u {.id, .name, .username}
    `,
      { id },
    );

    return result.records.length ? result.records[0].get('u') : null;
  });
};
