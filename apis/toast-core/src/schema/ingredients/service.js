import uuid from 'uuid';

export const createIngredient = async (
  { name, description = null, attribution = null },
  ctx
) => {
  const session = ctx.getSession();
  const result = await session.run(
    'CREATE (i:Ingredient {name: $name, description: $description, attribution: $attribution, id: $id}) RETURN i {.id, .name, .description}',
    {
      name: name.toLowerCase(),
      description: description || null,
      attribution,
      id: uuid()
    }
  );

  return result.records[0].get('i');
};
