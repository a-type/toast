import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { id, timestamp } from 'tools';
import { pick } from 'ramda';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

export const signup = async (user, credential, ctx) => {
  const password = await bcrypt.hash(credential.password, 10);
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      CREATE (u:User {
        name: $name,
        username: $username,
        createdAt: $timestamp,
        id: $id})<-[:AUTHENTICATES]-(c:Credential {
          email: $email,
          password: $password
        })
      RETURN u {.id, .name, .username}
    `,
      {
        email: credential.email,
        password,
        name: user.name,
        username: user.username,
        id: id(user.username),
        timestamp: timestamp(),
      },
    );

    const user = result.records[0].get('u');
    user.roles = [];
    return user;
  });
};

export const loginByEmail = (email, password, ctx) =>
  ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MATCH (c:Credential {email: $email})-[:AUTHENTICATES]->(u:User)-[:HAS_ROLE]->(r:Role)
      RETURN c {.password}, u {.id, .name, .username}, r {.id, .name}
      `,
      {
        email,
      },
    );

    if (!result.records.length) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const credential = result.records[0].get('c');
    const user = result.records[0].get('u');
    const roles = result.records.map(record => record.get('r'));
    const matches = await bcrypt.compare(password, credential.password);
    if (matches) {
      await tx.run(
        `
        MATCH (u:User {id: $id})
        SET u.lastLoginAt = $timestamp
        `,
        {
          id: user.id,
          timestamp: timestamp(),
        },
      );
      user.roles = roles;
      return user;
    }

    return null;
  });

export const login = async (credential, ctx) => {
  if (credential.email) {
    return loginByEmail(credential.email.email, credential.email.password, ctx);
  }

  throw new UserInputError('Unknown credential type');
};

export const createToken = async user => {
  const expires = new Date();
  expires.setDate(expires.getDate() + 3);

  return jwt.sign(
    {
      user: pick(['id', 'username', 'name'], user),
      roles: user.roles.map(r => r.name),
      expires: timestamp(expires),
    },
    config.security.tokenSecret,
  );
};
