import { gql } from 'apollo-server-express';
import { Context } from 'context';

export const typeDefs = gql`
  type User {
    id: ID!
    displayName: String
    email: String
    photoUrl: String
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

  extend type Group {
    members: [User!]!
  }
`;

export const resolvers = {
  Query: {
    me: (parent, args, ctx: Context) =>
      ctx.user ? ctx.graph.users.supplementUserData(ctx.user) : null,
    user: (_parent, { id }, ctx: Context) => ctx.graph.users.get(id),
  },
  Mutation: {
    mergeUser: (_parent, _args, ctx: Context) => ctx.graph.users.login(),
  },
  Recipe: {
    author: (parent, args, ctx: Context) =>
      ctx.graph.users.getRecipeAuthor(parent.id),
    discoverer: (parent, args, ctx: Context) =>
      ctx.graph.users.getRecipeDiscoverer(parent.id),
  },
  Group: {
    members: (parent, args, ctx: Context) =>
      ctx.graph.users.getGroupMembers(parent.id),
  },
};
