import {
  createRecipe,
  updateRecipeDetails,
  getRecipe,
  listRecipes,
  listRecipesForIngredient,
  publishRecipe,
  listRecipesForUser,
  linkRecipe,
  listDiscoveredRecipesForUser,
  recordRecipeView,
  listDraftRecipesForUser,
} from './service';
import * as recipeIngredients from './recipeIngredients';
import * as recipeSteps from './recipeSteps';
import { mergeDeepRight } from 'ramda';
import { gql } from 'apollo-server-express';

export const typeDefs = () => [
  gql`
    enum RecipeDisplayType {
      LINK
      FULL
    }

    type Recipe {
      id: ID!
      title: String!
      description: String
      attribution: String
      sourceUrl: String
      published: Boolean!
      displayType: RecipeDisplayType

      servings: Int!
      # all times in minutes
      cookTime: Int
      prepTime: Int
      unattendedTime: Int

      createdAt: String!
      updatedAt: String!
      viewedAt: String!
      views: Int!
    }

    input RecipeCreateInput {
      title: String!
      description: String
      attribution: String
      sourceUrl: String
    }

    input RecipeLinkInput {
      title: String!
      description: String
      attribution: String!
      sourceUrl: String!
      ingredientStrings: [String!]!
      cookTime: Int
      prepTime: Int
      unattendedTime: Int
      servings: Int
    }

    input RecipeDetailsUpdateInput {
      title: String
      description: String
      attribution: String
      sourceUrl: String
      displayType: RecipeDisplayType
      servings: Int
      cookTime: Int
      prepTime: Int
      unattendedTime: Int
    }

    extend type Query {
      recipes(pagination: ListPaginationInput): [Recipe!]!
      recipe(id: ID!): Recipe
    }

    extend type Mutation {
      createRecipe(input: RecipeCreateInput!): Recipe! @authenticated
      linkRecipe(input: RecipeLinkInput!): Recipe! @authenticated
      updateRecipeDetails(id: ID!, input: RecipeDetailsUpdateInput!): Recipe
        @authenticated
        @relatedToUser
      publishRecipe(id: ID!): Recipe @authenticated @relatedToUser
      recordRecipeView(id: ID!): Recipe
    }

    extend type Ingredient {
      recipes(pagination: ListPaginationInput): [Recipe!]!
    }

    extend type User {
      recipes(pagination: ListPaginationInput): [Recipe!]!
      discoveredRecipes(pagination: ListPaginationInput): [Recipe!]!
      draftRecipes(pagination: ListPaginationInput): [Recipe!]!
    }
  `,
  recipeIngredients.typeDefs,
  recipeSteps.typeDefs,
];

export const resolvers = [
  {
    Query: {
      recipes: (_parent, args, ctx, info) => listRecipes(args.pagination, ctx),
      recipe: async (_parent, args, ctx, info) => {
        try {
          const recipe = await getRecipe(args.id, ctx);
          return recipe;
        } catch (err) {
          console.dir(err);
          throw err;
        }
      },
    },
    Mutation: {
      createRecipe: (_parent, args, ctx, info) => createRecipe(args.input, ctx),
      linkRecipe: (_parent, args, ctx, info) => linkRecipe(args.input, ctx),
      updateRecipeDetails: (_parent, args, ctx, info) =>
        updateRecipeDetails(args.id, args.input, ctx),
      publishRecipe: (_parent, args, ctx, info) => publishRecipe(args.id, ctx),
      recordRecipeView: (_parent, args, ctx) => recordRecipeView(args.id, ctx),
    },
    Ingredient: {
      recipes: (parent, args, ctx, info) =>
        listRecipesForIngredient(
          parent.id,
          args.input || { offset: 0, count: 25 },
          ctx,
        ),
    },
    User: {
      recipes: (parent, args, ctx, info) =>
        listRecipesForUser(
          parent.id,
          args.pagination || { offset: 0, count: 25 },
          ctx,
        ),
      discoveredRecipes: (parent, args, ctx, info) =>
        listDiscoveredRecipesForUser(
          parent.id,
          args.pagination || { offset: 0, count: 25 },
          ctx,
        ),
      draftRecipes: (parent, args, ctx, info) =>
        listDraftRecipesForUser(
          parent.id,
          args.pagination || { offset: 0, count: 25 },
          ctx,
        ),
    },
  },
  recipeIngredients.resolvers,
  recipeSteps.resolvers,
].reduce(mergeDeepRight, {});
