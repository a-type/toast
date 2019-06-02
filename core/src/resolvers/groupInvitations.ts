import { Context } from 'context';
import GroupInvitation from 'models/GroupInvitation';
import logger from 'logger';
import { NotFoundError } from 'errors';

export default {
  Mutation: {
    createGroupInvitation: async (_parent, _args, ctx: Context) => {
      const group = await ctx.graph.groups.getForUser(ctx.user.id);

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

      const group = await ctx.graph.groups.addUser(
        invitation.groupId,
        ctx.user.id,
      );

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
