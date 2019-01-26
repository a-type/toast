import {
  listIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  mergeIngredients,
  getIngredientForRecipeIngredient,
} from './service';
import { gql } from 'apollo-server-express';
import { Context } from 'context';

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
    alternateNames: [String!]
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
      @hasClaim(claim: "admin")
    updateIngredient(id: ID!, input: IngredientUpdateInput!): Ingredient!
      @hasClaim(claim: "admin")
    deleteIngredient(id: ID!): Ingredient @hasClaim(claim: "admin")
    mergeIngredients(primary: ID!, secondary: ID!): Ingredient
      @hasClaim(claim: "admin")
  }

  extend type RecipeIngredient {
    ingredient: Ingredient!
  }

  extend type RecipeIngredientCorrectedValue {
    ingredient: Ingredient
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
  RecipeIngredient: {
    ingredient: ({ id }, _args, ctx, _info) =>
      getIngredientForRecipeIngredient(id, ctx),
  },
  RecipeIngredientCorrectedValue: {
    ingredient: ({ ingredientId }, _args, ctx: Context) =>
      getIngredient(ingredientId, ctx),
  },
};
