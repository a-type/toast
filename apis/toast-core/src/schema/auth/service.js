import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { id } from 'util';

export const signup = async (user, credential, ctx) => {
  const password = await bcrypt.hash(credential.password, 10);
  return ctx.transaction(async tx => {
    const result = await tx.run(
      `
      MERGE (u:User {name: $name, username: $username, id: $id})<-[:AUTHENTICATES]-(c:Credential {email: $email, password: $password})
      RETURN u {.id, .name, .username}
    `,
      {
        email: credential.email,
        password,
        name: user.name,
        username: user.username,
        id: id(user.username),
      },
    );

    return result.records[0].get('u');
  });
};

export const loginByEmail = (email, password, ctx) =>
  ctx.transaction(async tx => {
    const result = await tx.run(
      'MATCH (c:Credential {email: $email})-[:AUTHENTICATES]->(u:User) RETURN c {.password}, u {.id, .name, .username}',
      {
        email,
      },
    );

    if (!result.records.length) {
      throw new Error('Incorrect credentials');
    }

    const credential = result.records[0].get('c');
    const user = result.records[0].get('u');
    const matches = await bcrypt.compare(password, credential.password);
    if (matches) {
      return user;
    }

    return null;
  });

export const login = async (credential, ctx) => {
  if (credential.email) {
    return loginByEmail(credential.email.email, credential.email.password, ctx);
  }

  throw new Error('Unknown credential type');
};

export const createToken = async user =>
  jwt.sign({ user }, config.security.tokenSecret);
