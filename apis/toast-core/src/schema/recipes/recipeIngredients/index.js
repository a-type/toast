import {
  getForRecipe,
  parseRecipeIngredient,
  reparseRecipeIngredient,
  updateRecipeIngredient,
  moveRecipeIngredient,
  deleteRecipeIngredient,
} from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type RecipeIngredient {
    id: ID!
    text: String!
    ingredientTextMatch: String
    recipe: Recipe!
    unit: String
    unitTextMatch: String
    value: Float!
    valueTextMatch: String
    index: Int!
  }

  input RecipeIngredientParseInput {
    text: String!
  }

  input RecipeIngredientUpdateInput {
    unit: String
    unitTextMatch: String
    value: Float
    valueTextMatch: String
    ingredientId: ID
    ingredientTextMatch: String
  }

  extend type Recipe {
    ingredients: [RecipeIngredient!]!
  }

  extend type Mutation {
    updateRecipeIngredient(
      id: ID!
      input: RecipeIngredientUpdateInput!
    ): RecipeIngredient! @hasScope(scope: "update:fullRecipe")
    reparseRecipeIngredient(
      id: ID!
      input: RecipeIngredientParseInput!
    ): RecipeIngredient! @hasScope(scope: "update:fullRecipe")
    addRecipeIngredient(
      recipeId: ID!
      input: RecipeIngredientParseInput!
    ): Recipe! @hasScope(scope: "update:fullRecipe")
    moveRecipeIngredient(recipeId: ID!, input: ListMoveInput!): Recipe!
      @hasScope(scope: "update:fullRecipe")
    deleteRecipeIngredient(id: ID!): Recipe!
      @hasScope(scope: "update:fullRecipe")
  }
`;

export const resolvers = {
  Recipe: {
    ingredients: (parent, args, ctx, info) => getForRecipe(parent.id, ctx),
  },
  Mutation: {
    addRecipeIngredient: (parent, args, ctx, info) =>
      parseRecipeIngredient(args.recipeId, args.input, ctx),
    updateRecipeIngredient: (parent, args, ctx, info) =>
      updateRecipeIngredient(args.id, args.input, ctx),
    reparseRecipeIngredient: (parent, args, ctx, info) =>
      reparseRecipeIngredient(args.id, args.input, ctx),
    moveRecipeIngredient: (parent, args, ctx, info) =>
      moveRecipeIngredient(args.recipeId, args.input, ctx),
    deleteRecipeIngredient: (parent, args, ctx, info) =>
      deleteRecipeIngredient(args.id, ctx),
  },
};
