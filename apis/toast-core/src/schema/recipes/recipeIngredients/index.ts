import { gql, ForbiddenError } from 'apollo-server-express';
import { Context } from 'context';
import { IngredientParseResult } from 'services/ingredientParser/ingredientParser';
import { RecipeIngredient } from 'services/graph/sources/RecipeIngredients';
import logger from 'logger';

export const typeDefs = gql`
  type RecipeIngredient {
    id: ID!
    text: String!
    ingredientStart: Int
    ingredientEnd: Int
    recipe: Recipe!
    unit: String
    unitStart: Int
    unitEnd: Int
    value: Float!
    valueStart: Int
    valueEnd: Int
    index: Int!
    comments: [String!]!
    preparations: [String!]!
  }

  input RecipeIngredientParseInput {
    text: String!
  }

  input RecipeIngredientUpdateInput {
    unit: String
    unitStart: Int
    unitEnd: Int
    value: Float
    valueStart: Int
    valueEnd: Int
    ingredientId: ID
    ingredientStart: Int
    ingredientEnd: Int
    comments: [String!]
    preparations: [String!]
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
    ingredients: async (parent, args, ctx, info) => {
      const ingredients = await ctx.graph.recipeIngredients.getForRecipe(
        parent.id,
      );
      return ingredients;
    },
  },
  Mutation: {
    addRecipeIngredient: async (parent, args, ctx: Context) => {
      const isAuthoredByUser = await ctx.graph.recipes.isAuthoredByUser(
        args.recipeId,
        ctx.user.id,
      );
      if (!isAuthoredByUser) {
        throw new ForbiddenError(
          "You don't have permission to change someone else's recipe.",
        );
      }

      const [result] = await ctx.ingredientParser.parse([args.input.text]);
      const match = await ctx.graph.ingredients.searchForBestMatchOrCreate(
        result.ingredient.normalized,
      );
      await ctx.graph.recipeIngredients.create(
        args.recipeId,
        ctx.ingredientParser.toRecipeIngredient(result, match.id),
      );
      return ctx.graph.recipes.get(args.recipeId);
    },
    updateRecipeIngredient: async (parent, args, ctx: Context) => {
      const isAuthoredByUser = await ctx.graph.recipeIngredients.isPartOfRecipeAuthoredByUser(
        args.id,
        ctx.user.id,
      );
      if (!isAuthoredByUser) {
        throw new ForbiddenError(
          "You don't have permission to change someone else's recipe.",
        );
      }

      return ctx.graph.recipeIngredients.update(args.id, args.input);
    },
    reparseRecipeIngredient: async (parent, args, ctx: Context) => {
      const isAuthoredByUser = await ctx.graph.recipeIngredients.isPartOfRecipeAuthoredByUser(
        args.id,
        ctx.user.id,
      );
      if (!isAuthoredByUser) {
        throw new ForbiddenError(
          "You don't have permission to change someone else's recipe.",
        );
      }

      const [result] = await ctx.ingredientParser.parse([args.input.text]);
      const match = await ctx.graph.ingredients.searchForBestMatchOrCreate(
        result.ingredient.normalized,
      );
      return ctx.graph.recipeIngredients.update(
        args.id,
        ctx.ingredientParser.toRecipeIngredient(result, match.id),
      );
    },
    moveRecipeIngredient: async (parent, args, ctx: Context) => {
      const isAuthoredByUser = await ctx.graph.recipes.isAuthoredByUser(
        args.recipeId,
        ctx.user.id,
      );
      if (!isAuthoredByUser) {
        throw new ForbiddenError(
          "You don't have permission to change someone else's recipe.",
        );
      }

      return ctx.graph.recipes.moveIngredient(args.recipeId, args.input);
    },
    deleteRecipeIngredient: async (parent, args, ctx: Context) => {
      const isAuthoredByUser = await ctx.graph.recipeIngredients.isPartOfRecipeAuthoredByUser(
        args.id,
        ctx.user.id,
      );
      if (!isAuthoredByUser) {
        throw new ForbiddenError(
          "You don't have permission to change someone else's recipe.",
        );
      }

      return ctx.graph.recipeIngredients.delete(args.id);
    },
  },
};
