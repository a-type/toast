import {
  listIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  mergeIngredients,
} from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Ingredient {
    id: ID!
    name: String!
    description: String
    attribution: String
    alternateNames: [String!]!
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

  input IngredientListSortInput {
    by: String!
    order: SortOrder
  }

  extend type Query {
    ingredients(
      pagination: ListPaginationInput
      sort: IngredientListSortInput
    ): [Ingredient!]!
    ingredient(id: ID!): Ingredient
  }

  extend type Mutation {
    createIngredient(input: IngredientCreateInput!): Ingredient!
      @hasScope(scope: "create:ingredient")
    updateIngredient(id: ID!, input: IngredientUpdateInput!): Ingredient!
      @hasScope(scope: "update:ingredient")
    deleteIngredient(id: ID!): Ingredient @hasScope(scope: "delete:ingredient")
    mergeIngredients(primary: ID!, secondary: ID!): Ingredient
      @hasScope(scope: "update:mergeIngredients")
  }
`;

export const resolvers = {
  Query: {
    ingredients: (_parent, args, ctx, info) =>
      listIngredients(args.pagination, args.sort, ctx),
    ingredient: (_parent, args, ctx, info) => getIngredient(args.id, ctx),
  },
  Mutation: {
    createIngredient: (_parent, args, ctx, info) =>
      createIngredient(args.input, ctx),
    updateIngredient: (_parent, args, ctx, info) =>
      updateIngredient(args.id, args.input, ctx),
    deleteIngredient: (_parent, args, ctx, info) =>
      deleteIngredient(args.id, ctx),
    mergeIngredients: (_parent, args, ctx, info) => mergeIngredients(args, ctx),
  },
};
