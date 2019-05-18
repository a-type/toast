import { gql } from 'apollo-server-express';
import { Context } from 'context';
import { neo4jgraphql } from 'neo4j-graphql-js';

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
    author: User @relation(name: "AUTHOR_OF", direction: "IN")
    discoverer: User @relation(name: "DISCOVERER_OF", direction: "IN")
  }

  extend type Group {
    members: [User!]!
  }
`;

export const resolvers = {
  Query: {
    me: async (parent, args, ctx: Context, info) => {
      if (!ctx.user) {
        return null;
      }
      const neo4jResult = await neo4jgraphql(
        parent,
        { id: ctx.user.id },
        ctx,
        info,
      );
      if (neo4jResult.group) {
        ctx.storeGroupId(neo4jResult.group.id);
      }
      return ctx.graph.users.supplementUserData(neo4jResult);
    },
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
