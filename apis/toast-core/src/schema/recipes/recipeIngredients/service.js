export const getForRecipe = async (id, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    `
    MATCH (ingredient:Ingredient)-[rel:INGREDIENT_OF]->(:Recipe {id: $id})
    RETURN rel { .id, .index, .unit, .unitValue }, ingredient { .name, .description, .id } ORDER BY rel.index
  `,
    { id }
  );

  return result.records.map(record => ({
    ...record.get('rel'),
    ingredient: record.get('ingredient')
  }));
};
