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
  author: User!
}
`;

export const resolvers = {
  Query: {
    me: neo4jgraphql,
    user: neo4jgraphql,
    users: neo4jgraphql
  },
  Recipe: {
    author: (parent, args, ctx, info) => {
      const author = getRecipeAuthor(parent.id, ctx);
      return author;
    }
  }
};
