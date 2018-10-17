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

  extend type Group {
    members: [User!]!
  }
`;

export const resolvers = {
  Query: {
    me: (parent, args, ctx, info) =>
      ctx.user ? ctx.graph.users.supplementAuth0Data(ctx.user) : null,
    user: (_parent, { id }, ctx) => ctx.graph.users.get(id),
  },
  Mutation: {
    mergeUser: (_parent, _args, ctx, info) => ctx.graph.users.login(),
  },
  Recipe: {
    author: (parent, args, ctx, info) =>
      ctx.graph.users.getRecipeAuthor(parent.id),
    discoverer: (parent, args, ctx, info) =>
      ctx.graph.users.getRecipeDiscoverer(parent.id),
  },
  Group: {
    members: (parent, args, ctx) => ctx.graph.users.getGroupMembers(parent.id),
  },
};
