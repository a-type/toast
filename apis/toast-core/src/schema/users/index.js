import { neo4jgraphql } from 'neo4j-graphql-js';
import { getRecipeAuthor, mergeUser, getUser } from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String
    nickname: String
    email: String
  }

  extend type Query {
    me: User
    user(id: ID!): User
  }

  extend type Mutation {
    mergeUser: User
  }

  extend type Recipe {
    author: User
    discoverer: User
  }
`;

export const resolvers = {
  Query: {
    me: (parent, args, ctx, info) => {
      return ctx.user ? getUser(ctx.user.sub, ctx) : null;
    },
    user: (_parent, { id }, ctx) => getUser(id, ctx),
  },
  Mutation: {
    mergeUser: (_parent, _args, ctx, info) => mergeUser(ctx),
  },
  Recipe: {
    author: (parent, args, ctx, info) => getRecipeAuthor(parent.id, ctx),
    discoverer: (parent, args, ctx, info) =>
      getRecipeDiscoverer(parent.id, ctx),
  },
};
