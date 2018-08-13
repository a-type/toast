import { id } from 'util';

const FIELDS = `.id, .name, .description, .attribution`;

export const listIngredients = ({ offset = 0, count = 10 }, ctx) => {
  const session = ctx.getSession();
  return session.readTransaction(async tx => {
    const result = await tx.run(
      `
        MATCH (ingredient:Ingredient)
        RETURN ingredient { ${FIELDS} }
        SKIP $offset LIMIT $count
      `,
      { offset, count }
    );

    return result.records.map(rec => rec.get('ingredient'));
  });
};

export const getIngredient = (id, ctx) => {
  const session = ctx.getSession();
  return session.readTransaction(async tx => {
    const result = await tx.run(
      `
        MATCH (ingredient:Ingredient { id: $id })
        RETURN ingredient { ${FIELDS} }
      `,
      { id }
    );

    if (result.records.length === 0) {
      return null;
    }

    return result.records[0].get('ingredient');
  });
};

export const createIngredient = (
  { name, description = null, attribution = null },
  ctx
) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      'CREATE (i:Ingredient {name: $name, description: $description, attribution: $attribution, id: $id}) RETURN i {.id, .name, .description}',
      {
        name: name.toLowerCase(),
        description: description || null,
        attribution,
        id: id(name)
      }
    );

    return result.records[0].get('i');
  });
};

export const updateIngredient = (id, input, ctx) => {
  const session = ctx.getSession();
  return session.writeTransaction(async tx => {
    const result = await tx.run(
      `
        MATCH (ingredient:Ingredient { id: $id })
        SET ingredient += $input
        RETURN ingredient { ${FIELDS} }
      `,
      { id, input: pick(['name', 'description', 'attribution'], input) }
    );

    if (result.records.length === 0) {
      throw new Error("That ingredient doesn't exist");
    }

    return result.records[0].get('ingredient');
  });
};
