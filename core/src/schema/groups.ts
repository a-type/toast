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
      @authenticated
      @generateId(type: "group")
      @generateId(type: "recipeCollection", argName: "collectionId")
      @cypher(
        statement: """
        MATCH (user:User {id: $cypherParams.userId})
        CREATE (group:Group {id: $id, groceryDay: 0})<-[:MEMBER_OF]-(user)
        CREATE (group)-[:HAS_COLLECTION]->(:RecipeCollection {id: $collectionId, name: "Saved", default: true})
        RETURN group
        """
      )
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
    async createGroup(parent, args, ctx: Context, info) {
      const group = await neo4jgraphql(parent, args, ctx, info);
      await ctx.planning.syncPlan(group.id);
      ctx.storeGroupId(group.id);
      return group;
    },
  },
};
