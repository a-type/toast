import { gql } from 'apollo-server-express';
import { Context } from 'context';
import neo4jgraphql from 'neo4j-graphql-js';

export const typeDefs = gql`
  type Group {
    id: ID!
    groceryDay: WeekDay!
  }

  extend type User {
    group: Group @authenticated @relation(name: "MEMBER_OF", direction: "OUT")
  }

  extend type Query {
    """
    Shortcut to the user's group
    """
    group: Group @authenticated
  }

  extend type Mutation {
    setGroceryDay(groceryDay: Int!): Group!
    createGroup: Group!
  }
`;

export const resolvers = {
  Query: {
    async group(parent, _args, ctx: Context, info) {
      const groupId = await ctx.getGroupId();
      return neo4jgraphql(parent, { id: groupId }, ctx, info);
    },
  },
  Mutation: {
    setGroceryDay(_parent, { groceryDay }, ctx: Context) {
      return ctx.graph.groups.mergeMine({ groceryDay });
    },
    async createGroup(_parent, _args, ctx: Context) {
      const group = await ctx.graph.groups.mergeMine({ groceryDay: 0 });
      await ctx.planning.syncPlan(group.id);
      ctx.storeGroupId(group.id);
      return group;
    },
  },
};
