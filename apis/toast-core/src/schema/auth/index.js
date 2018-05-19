import neo4jgraphql from 'neo4j-graphql-js';
import { signup, createToken } from './service';

export const typeDefs = `
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
  signup(name: String!, username: String!, credential: Credential!): AuthResponse!
  login(credential: Credential!): AuthResponse!
}
`;

export const resolvers = {
  Mutation: {
    signup: async (_parent, args, ctx, resolution) => {
      const user = await signup(
        { name: args.name, username: args.username },
        args.credential.email,
        ctx
      );
      return { token: createToken(user) };
    },
    login: (_parent, args, ctx, resolution) => {
      /* TODO */
    }
  }
};
