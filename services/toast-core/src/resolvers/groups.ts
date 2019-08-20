import { resolver as arango } from 'graphql-arangodb';
import { Context } from 'context';
import { aql } from 'toast-common';
import { createHash } from 'crypto';
import uuid from 'uuid';
import { NotFoundError } from 'errors';
import { isAfter, addHours } from 'date-fns';

export default {
  Query: {
    viewer: arango,
  },
  Mutation: {
    mergeUser: arango,
    createGroup: arango,
    setGroceryDay: arango,

    createGroupInvitation: async (_parent, _args, ctx: Context) => {
      const group = await getUserGroup(ctx);
      if (!group) {
        throw new NotFoundError('Group');
      }
      const groupId = group._key;

      const secret = uuid();

      const sha256 = createHash('sha256');
      sha256.update(secret);
      const hash = sha256.digest();

      // store the hash in the db. it will be looked up later by hashing the secret provided by a user
      await ctx.arangoDb.query(aql`
        INSERT {
          hash: ${hash},
          groupId: ${groupId},
          lifetimeHours: 24,
          createdAt: ${new Date().getTime()}
        } INTO GroupInvitations
      `);

      return hash;
    },

    acceptGroupInvitation: async (
      _parent,
      { id }: { id: string },
      ctx: Context,
    ) => {
      const sha256 = createHash('sha256');
      sha256.update(id);
      const hash = sha256.digest();

      const invitations = await ctx.arangoDb.query(aql`
        FOR groupInvitation IN GroupInvitations
          FILTER groupInvitation.hash = ${hash}
          LIMIT 1
          RETURN groupInvitation
      `);

      if (!invitations.hasNext()) {
        throw new NotFoundError('GroupInvitation');
      }

      const invitation = await invitations.next();

      if (
        isAfter(
          addHours(invitation.createdAt, invitation.lifetimeHours),
          new Date(),
        )
      ) {
        throw new NotFoundError('GroupInvitation');
      }

      const oldGroup = await getUserGroup(ctx);
      if (oldGroup) {
        // move the user from their old group
        await ctx.arangoDb.query(aql`
          FOR node, edge IN OUTBOUND "Users/${ctx.user.id}" MemberOf
            FILTER node._key == ${oldGroup._key}
            LIMIT 1
            REMOVE edge FROM MemberOf
        `);

        // TODO: clean empty groups
      }

      await ctx.arangoDb.query(aql`
        INSERT {
          _from: ${`Users/${ctx.user.id}`},
          _to: ${`Groups/${invitation.groupId}`}
        } INTO MemberOf
      `);

      // finally, delete the invitation
      await ctx.arangoDb.query(aql`
        REMOVE { hash: ${hash} } FROM GroupInvitations
      `);

      return {
        group: {
          id: invitation.groupId,
          // for resolving further graph data
          _key: invitation.groupId,
        },
      };
    },
  },
};

/**
 * Returns the authenticated user's group
 */
const getUserGroup = async (ctx: Context) => {
  const groups = await ctx.arangoDb.query(aql`
    FOR group IN OUTBOUND "Users/${ctx.user.id}" MemberOf
      LIMIT 1
      RETURN group
  `);

  if (!groups.hasNext()) {
    return null;
  }

  return await groups.next();
};
