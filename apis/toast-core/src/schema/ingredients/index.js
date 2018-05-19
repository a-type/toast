import { neo4jgraphql } from 'neo4j-graphql-js';
import { createIngredient } from './service';

export const typeDefs = `
type Ingredient {
  id: ID!
  name: String!
  description: String
}

input IngredientCreateInput {
  name: String!
  description: String
}

input IngredientUpdateInput {
  name: String
  description: String
}

extend type Query {
  ingredients: [Ingredient!]!
  ingredient(id: ID!): Ingredient
}

extend type Mutation {
  createIngredient(input: IngredientCreateInput!): Ingredient!
  updateIngredient(id: ID!, input: IngredientUpdateInput!): Ingredient!
}
`;

export const resolvers = {
  Query: {
    ingredients: neo4jgraphql,
    ingredient: neo4jgraphql
  },
  Mutation: {
    createIngredient: async (_parent, args, ctx, info) => {
      const ingredient = await createIngredient(args.input, ctx);
      return ingredient;
    },
    updateIngredient: neo4jgraphql
  }
};
