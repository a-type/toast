import auth0 from 'services/auth0';
import { AuthenticationError } from 'apollo-server-core';
import logger from 'logger';

const USER_FIELDS = `.id`;

const supplementAuth0Data = async dbUser => {
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

export const mergeUser = ctx => {
  const { user } = ctx;

  return ctx.transaction(async tx => {
    let result = await tx.run(
      `
      MATCH (u:User)<-[:AUTHENTICATES]-(c:Credential {email: $user.email})
      RETURN u {.id, .email}
      `,
      { user },
    );

    // TODO: remove after full migration
    if (result.records.length) {
      result = await tx.run(
        `
        MATCH (u:User {id: $id})
        SET u.id = $newId
        RETURn u {${USER_FIELDS}}
        `,
        {
          id: result.records[0].get('u').id,
          newId: user.sub,
        },
      );
    } else {
      result = await tx.run(
        `
        MERGE (u:User {id: $id})
        RETURN u {${USER_FIELDS}}
        `,
        {
          id: user.sub,
        },
      );
    }

    if (result.records.length) {
      const user = await supplementAuth0Data(result.records[0].get('u'));
      return user;
    } else {
      throw new AuthenticationError('Something went wrong while logging in');
    }
  });
};

export const getUser = (id, ctx) => {
  return supplementAuth0Data({ id });
};

export const getRecipeAuthor = (id, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (u:User)-[:AUTHOR_OF]->(:Recipe {id: $id})
      RETURN u {${USER_FIELDS}}
    `,
      { id },
    );

    if (result.records.length) {
      const user = await supplementAuth0Data(result.records[0].get('u'));
      return user;
    } else {
      return null;
    }
  });
};

export const getRecipeDiscoverer = (id, ctx) => {
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (u:User)-[:DISCOVERER_OF]->(:Recipe {id: $id})
      RETURN u {${USER_FIELDS}}
    `,
      { id },
    );

    if (result.records.length) {
      const user = await supplementAuth0Data(result.records[0].get('u'));
      return user;
    } else {
      return null;
    }
  });
};
