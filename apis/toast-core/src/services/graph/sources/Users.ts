import auth0 from 'services/auth0';
import logger from 'logger';
import Source from './Source';
import { AuthenticationError } from 'errors';

export default class Users extends Source {
  constructor(ctx, graph) {
    super(ctx, graph, 'User', ['id']);
  }

  supplementAuth0Data = async dbUser => {
    const { id } = dbUser;

    try {
      const auth0User = await auth0.getUser({ id });
      return {
        ...dbUser,
        ...(auth0User || {}),
      };
    } catch (err) {
      // probably this user was not migrated to auth0 yet...
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

      return this.hydrateOne(result);
    });

  getMe = () => this.get(this.ctx.user.id);

  update = async (userId, data) =>
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

      return this.hydrateOne(result, { throwIfNone: true });
    });

  updateMe = async data => this.update(this.ctx.user.id, data);

  getRecipeAuthor = recipeId =>
    this.ctx.transaction(async tx => {
      const result = await tx.run(
        `
        MATCH (user:User)-[:AUTHOR_OF]->(:Recipe {id: $recipeId})
        RETURN user {${this.dbFields}}
      `,
        { recipeId },
      );

      return this.hydrateOne(result);
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

      return this.hydrateOne(result);
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

      return this.hydrateList(result);
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
        return user;
      } else {
        throw new AuthenticationError('Something went wrong while logging in');
      }
    });
}
