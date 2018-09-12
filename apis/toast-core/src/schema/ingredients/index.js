import {
  listIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Ingredient {
    id: ID!
    name: String!
    description: String
    attribution: String
  }

  input IngredientCreateInput {
    name: String!
    description: String
    attribution: String
  }

  input IngredientUpdateInput {
    name: String
    description: String
    attribution: String
  }

  extend type Query {
    ingredients(pagination: ListPaginationInput): [Ingredient!]!
    ingredient(id: ID!): Ingredient
  }

  extend type Mutation {
    createIngredient(input: IngredientCreateInput!): Ingredient!
    updateIngredient(id: ID!, input: IngredientUpdateInput!): Ingredient!
    deleteIngredient(id: ID!): Ingredient @hasRole(role: "admin")
  }
`;

export const resolvers = {
  Query: {
    ingredients: (_parent, args, ctx, info) =>
      listIngredients(args.pagination, ctx),
    ingredient: (_parent, args, ctx, info) => getIngredient(args.id, ctx),
  },
  Mutation: {
    createIngredient: (_parent, args, ctx, info) =>
      createIngredient(args.input, ctx),
    updateIngredient: (_parent, args, ctx, info) =>
      updateIngredient(args.id, args.input, ctx),
    deleteIngredient: (_parent, args, ctx, info) =>
      deleteIngredient(args.id, ctx),
  },
};
