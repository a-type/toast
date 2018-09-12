import neo4jgraphql from 'neo4j-graphql-js';
import { signup, createToken, login } from './service';
import { gql, AuthenticationError } from 'apollo-server-express';

export const typeDefs = gql`
  type AuthResponse {
    token: String!
  }

  input Credential {
    email: EmailCredential
  }

  input EmailCredential {
    email: String!
    password: String!
  }

  extend type Mutation {
    signup(
      name: String!
      username: String!
      credential: Credential!
    ): AuthResponse!
    login(credential: Credential!): AuthResponse!
  }
`;

export const resolvers = {
  Mutation: {
    signup: async (_parent, args, ctx, resolution) => {
      const user = await signup(
        { name: args.name, username: args.username },
        args.credential.email,
        ctx,
      );
      return { token: createToken(user) };
    },
    login: async (_parent, args, ctx, resolution) => {
      const user = await login(args.credential, ctx);
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      return { token: createToken(user) };
    },
  },
};
