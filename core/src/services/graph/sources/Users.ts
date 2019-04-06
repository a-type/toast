import logger from 'logger';
import Source from './Source';
import { AuthenticationError } from 'errors';
import firebase from 'services/firebase';

export interface User {
  id: string;
}

export default class Users extends Source<User> {
  constructor(ctx, graph) {
    super(ctx, graph, 'User', ['id']);
  }

  supplementUserData = async (
    dbUser: User,
  ): Promise<User & Partial<firebase.auth.UserRecord>> => {
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
      // probably this user was not migrated to firebase yet...
      logger.warn(err);
      return dbUser;
    }
  };

  get = async userId =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (user:User {id: $userId})
        RETURN user {${this.dbFields}}
        `,
        {
          userId,
        },
      );

      return this.supplementUserData(this.hydrateOne(result));
    });

  getMe = () => this.get(this.ctx.user.id);

  update = async (userId: string, data: Partial<User>) =>
    this.ctx.writeTransaction(async tx => {
      const result = await tx.run(
        `
        MATCH (user:User {id: $userId})
        SET user += $fields
        RETURN user {${this.dbFields}}
        `,
        {
          userId,
          fields: this.filterInputFields(data),
        },
      );

      return this.supplementUserData(
        this.hydrateOne(result, { throwIfNone: true }),
      );
    });

  updateMe = async (data: Partial<User>) => this.update(this.ctx.user.id, data);

  getRecipeAuthor = recipeId =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
        MATCH (user:User)-[:AUTHOR_OF]->(:Recipe {id: $recipeId})
        RETURN user {${this.dbFields}}
      `,
        { recipeId },
      );

      return this.supplementUserData(this.hydrateOne(result));
    });

  getRecipeDiscoverer = recipeId =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
        MATCH (user:User)-[:DISCOVERER_OF]->(:Recipe {id: $id})
        RETURN user {${this.dbFields}}
        `,
        { id: recipeId },
      );

      return this.supplementUserData(this.hydrateOne(result));
    });

  getGroupMembers = groupId =>
    this.ctx.readTransaction(async tx => {
      const result = await tx.run(
        `
      MATCH (:Group {id: $groupId})<-[:MEMBER_OF]-(user:User)
      RETURN user {${this.dbFields}}
      `,
        {
          groupId,
        },
      );

      return Promise.all(this.hydrateList(result).map(this.supplementUserData));
    });

  login = () =>
    this.ctx.writeTransaction(async tx => {
      const result = await tx.run(
        `
        MERGE (user:User {id: $userId})
        RETURN user {${this.dbFields}}
        `,
        {
          userId: this.ctx.user.id,
        },
      );

      const user = this.hydrateOne(result);
      if (user) {
        return this.supplementUserData(user);
      } else {
        throw new AuthenticationError('Something went wrong while logging in');
      }
    });
}
