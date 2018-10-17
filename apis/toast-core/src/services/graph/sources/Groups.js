import logger from 'logger';
import Source from './Source';
import { NotFoundError, AuthenticationError } from 'errors';
import { id } from 'tools';

export default class Groups extends Source {
  constructor(ctx, graph) {
    super(ctx, graph, 'Group', ['id', 'planId']);
  }

  get = groupId =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (group:Group {id: $groupId})
        RETURN group {${this.dbFields}}
        `,
        {
          groupId,
        },
      );

      return this.hydrateOne(result);
    });

  getMine = () =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (group:Group)<-[:MEMBER_OF]-(:User {id: $userId})
        RETURN group {${this.dbFields}}
        `,
        {
          userId: this.ctx.user.id,
        },
      );

      return this.hydrateOne(result);
    });

  mergeMine = (input = {}) =>
    this.ctx.writeTransaction(async tx => {
      const result = await tx.run(
        `
      MATCH (user:User {id: $userId})
      MERGE (group:Group)<-[:MEMBER_OF]-(user)
        ON CREATE SET group.id = $id, group += $data
        ON MATCH SET group += $data
      RETURN group {${this.dbFields}}
      `,
        {
          userId: this.ctx.user.id,
          id: id(),
          data: this.filterInputFields(input),
        },
      );

      return this.hydrateOne(result);
    });
}
