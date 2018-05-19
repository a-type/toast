export const getForRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    `
    MATCH (step:Step)-[rel:STEP_OF]->(:Recipe {id: $id})
    RETURN rel { .id, .index }, step { .id, .text } ORDER BY rel.index
  `,
    { id }
  );

  return result.records.map(record => ({
    ...record.get('rel'),
    step: record.get('step')
  }));
};
