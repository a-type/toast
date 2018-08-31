import { neo4jgraphql } from 'neo4j-graphql-js';
import { getRecipeAuthor } from './service';

export const typeDefs = `
type User {
  id: ID!
  name: String
  username: String!
}

extend type Query {
  me: User! @authenticated
  users: [User!]!
  user(id: ID!): User
}

extend type Recipe {
  author: User
  discoverer: User
}
`;

export const resolvers = {
  Query: {
    me: (parent, args, ctx, info) => ctx.user,
    user: neo4jgraphql,
    users: neo4jgraphql,
  },
  Recipe: {
    author: (parent, args, ctx, info) => getRecipeAuthor(parent.id, ctx),
    discoverer: (parent, args, ctx, info) =>
      getRecipeDiscoverer(parent.id, ctx),
  },
};
