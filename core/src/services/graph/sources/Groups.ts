import Source from './Source';
import { id } from 'tools';
import logger from 'logger';

export interface Group {
  id: string;
  groceryDay: number;
}

export default class Groups extends Source<Group> {
  constructor(ctx, graph) {
    super(ctx, graph, 'Group', ['id', 'groceryDay']);
  }

  get = (groupId: string) =>
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

  getForUser = (userId: string) =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
          MATCH (group:Group)<-[:MEMBER_OF]-(:User {id: $userId})
          RETURN group {${this.dbFields}}
        `,
        {
          userId,
        },
      );

      return this.hydrateOne(result);
    });

  getMine = () => this.getForUser(this.ctx.user.id);

  mergeMine = (input: Partial<Group> = {}) =>
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

      return this.hydrateOne(result, { throwIfNone: true });
    });

  addUser = (groupId: string, userId: string) =>
    this.ctx.writeTransaction(async tx => {
      // for now: a user can only be part of one group. First detach old groups
      // and delete orphaned groups
      const oldGroupResult = await tx.run(
        `
        MATCH (:User {id: $userId})-[oldRel:MEMBER_OF]->(oldGroup:Group)
        WITH collect(oldRel) as oldRels, oldGroup
        FOREACH (r in oldRels | DELETE r)
        RETURN oldGroup {.id}
        `,
        {
          userId,
        },
      );

      if (oldGroupResult.records.length) {
        logger.info(
          `Moving user ${userId} from group ${
            oldGroupResult.records[0].get('oldGroup').id
          } to ${groupId}`,
        );
      }

      /**
       * TODO: determine how to safely delete orphaned groups.
       * This query extension would work, but I'm not sure we want to do this without
       * backups.
       *
       *WITH oldGroup
        MATCH (oldGroup)
        WHERE (NOT (oldGroup)<-[:MEMBER_OF]-())
        DELETE oldGroup
       *
       */

      const result = await tx.run(
        `
        MATCH (user:User {id: $userId}), (group:Group {id: $groupId})
        MERGE (group)<-[:MEMBER_OF]-(user)
        RETURN group {${this.dbFields}}
      `,
        {
          userId,
          groupId,
        },
      );

      return this.hydrateOne(result);
    });
}
