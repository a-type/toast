import { Context } from 'context';
import GroupInvitation from 'models/GroupInvitation';
import logger from 'logger';
import { NotFoundError } from 'errors';

export default {
  Mutation: {
    createGroupInvitation: async (_parent, _args, ctx: Context) => {
      const group = await ctx.readTransaction(async tx => {
        const result = await tx.run(
          `
          MATCH (group:Group)<-[:MEMBER_OF]-(:User {id: $userId})
          RETURN group {.id}
          `,
          {
            userId: ctx.user.id,
          },
        );

        return result.records[0].get('group');
      });

      const invitation = await GroupInvitation.create(group.id);
      await ctx.firestore.groupInvitations.set(invitation);

      return invitation.plaintextSecretKey;
    },

    acceptGroupInvitation: async (
      _parent,
      { id }: { id: string },
      ctx: Context,
    ) => {
      const hashed = await GroupInvitation.hashId(id);
      const invitation = await ctx.firestore.groupInvitations.get(hashed);

      if (!invitation) {
        throw new NotFoundError('GroupInvitation');
      }

      if (invitation.expired) {
        logger.info(`Cleaning expired invitation ${invitation.id}`);
        try {
          await ctx.firestore.groupInvitations.delete(invitation.id);
        } catch (err) {
          logger.fatal(err);
        }
        throw new NotFoundError('GroupInvitation');
      }

      const group = await ctx.writeTransaction(async tx => {
        const oldGroupResult = await tx.run(
          `
          MATCH (:User{id:$userId})-[oldRel:MEMBER_OF]->(oldGroup:Group)
          WITH collect(oldRel) as oldRels, oldGroup
          FOREACH (r in oldRels | DELETE r)
          RETURN oldGroup
          `,
          {
            userId: ctx.user.id,
          },
        );

        if (oldGroupResult.records.length) {
          logger.info(
            `Moving user ${ctx.user.id} from group ${
              oldGroupResult.records[0].get('oldGroup').id
            } to ${invitation.groupId}
            `,
          );
        }

        const result = await tx.run(
          `
          MATCH (user:User{id:$userId}), (group:Group{id:$groupId})
          MERGE (user)-[:MEMBER_OF]->(group)
          RETURN group
          `,
          {
            userId: ctx.user.id,
            groupId: invitation.groupId,
          },
        );

        return result.records[0].get('group');
      });

      try {
        logger.info(`Cleaning used invitation ${invitation.id}`);
        await ctx.firestore.groupInvitations.delete(invitation.id);
      } catch (err) {
        logger.fatal(err);
      }

      return {
        groupId: group.id,
      };
    },
  },
};
