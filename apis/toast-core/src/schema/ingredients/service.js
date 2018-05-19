import uuid from 'uuid';

export const createIngredient = async ({ name, description = null }, ctx) => {
  const session = ctx.getSession();
  const result = await session.run(
    'CREATE (i:Ingredient {name: $name, description: $description, id: $id}) RETURN i {.id, .name, .description}',
    {
      name,
      description: description || null,
      id: uuid()
    }
  );

  return result.records[0].get('i');
};
