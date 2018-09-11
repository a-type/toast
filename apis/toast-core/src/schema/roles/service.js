import { id } from 'tools';

export const ROLE_FIELDS = `.id, .name`;

export const getUserRoles = (id, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (u:User {id: $id})-[:HAS_ROLE]->(r:Role)
      RETURN r {${ROLE_FIELDS}}
      `,
      {
        id,
      },
    );

    return result.records.map(record => record.get('r'));
  });
};
