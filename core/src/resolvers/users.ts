import { Context } from 'context';
import logger from 'logger';
import firebase from 'services/firebase';

const supplementUserData = async (
  dbUser: any,
): Promise<any & Partial<firebase.auth.UserRecord>> => {
  if (!dbUser) {
    return dbUser;
  }

  const id = dbUser.id;
  if (!id) {
    return dbUser;
  }

  try {
    const firebaseUser = await firebase.auth().getUser(id);
    return {
      ...dbUser,
      ...firebaseUser,
    };
  } catch (err) {
    logger.warn(err);
    return dbUser;
  }
};

export default {
  Query: {
    me: async (parent, args, ctx: Context, info) => {
      if (!ctx.user) {
        return null;
      }
      const user = await ctx.runCypher();
      if (user.group) {
        ctx.storeGroupId(user.group.id);
      }
      return supplementUserData(user);
    },
    user: (_parent, { id }, ctx: Context) => ctx.graph.users.get(id),
  },
};
