import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type RecipeCollection {
    id: ID!
    name: String!
    default: Boolean!
  }

  extend type Group {
    collections(first: Int = 5, offset: Int = 0): [RecipeCollection!]!
      @relation(name: "HAS_COLLECTION", direction: "OUT")
    collection(id: ID!): RecipeCollection
      @cypher(
        statement: """
        MATCH (this)-[:HAS_COLLECTION]->(collection:RecipeCollection {id: $id})
        RETURN collection
        """
      )
  }
`;

export const resolvers = {};
