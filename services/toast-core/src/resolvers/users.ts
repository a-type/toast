import { Context } from 'context';
import { logger } from 'toast-common';
import firebase from 'services/firebase';
import { resolver as arango } from 'graphql-arangodb';

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
    viewer: async (parent, args, ctx: Context, info) => {
      if (!ctx.user) {
        return null;
      }
      const user = await arango(parent, args, ctx, info);
      return supplementUserData(user);
    },
  },
};
