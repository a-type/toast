import * as recipeIngredients from './recipeIngredients';
import * as recipeSteps from './recipeSteps';
import * as yourLike from './yourLike';
import * as likes from './likes';
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
      servings: Int
      cookTime: Int
      prepTime: Int
      unattendedTime: Int
      displayType: RecipeDisplayType
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
      createRecipe(input: RecipeCreateInput!): Recipe!
        @hasScope(scope: "create:fullRecipe")
      linkRecipe(input: RecipeLinkInput!): Recipe!
        @hasScope(scope: "create:linkedRecipe")
      updateRecipeDetails(id: ID!, input: RecipeDetailsUpdateInput!): Recipe
        @hasScope(scope: "update:fullRecipe")
      publishRecipe(id: ID!): Recipe @hasScope(scope: "update:fullRecipe")
      recordRecipeView(id: ID!): Recipe
    }

    extend type Ingredient {
      recipes(pagination: ListPaginationInput): [Recipe!]!
    }

    extend type User {
      recipes(pagination: ListPaginationInput): [Recipe!]!
      discoveredRecipes(pagination: ListPaginationInput): [Recipe!]!
      draftRecipes(pagination: ListPaginationInput): [Recipe!]!
      likedRecipes(pagination: ListPaginationInput): [Recipe!]!
    }
  `,
  recipeIngredients.typeDefs,
  recipeSteps.typeDefs,
  yourLike.typeDefs,
  likes.typeDefs,
];

export const resolvers = [
  {
    Query: {
      recipes: (_parent, args, ctx, info) =>
        ctx.graph.recipes.list(args.pagination),
      recipe: async (_parent, args, ctx, info) =>
        ctx.graph.recipes.get(args.id),
    },
    Mutation: {
      createRecipe: (_parent, args, ctx, info) =>
        ctx.graph.recipes.create(args.input),
      linkRecipe: (_parent, args, ctx, info) =>
        ctx.graph.recipes.link(args.input),
      updateRecipeDetails: (_parent, args, ctx, info) =>
        ctx.graph.recipes.updateDetails(args.id, args.input),
      publishRecipe: (_parent, args, ctx, info) =>
        ctx.graph.recipes.publish(args.id),
      recordRecipeView: (_parent, args, ctx) =>
        ctx.graph.recipes.recordView(args.id),
    },
    Ingredient: {
      recipes: (parent, args, ctx, info) =>
        ctx.graph.recipes.listForIngredient(
          parent.id,
          args.input || { offset: 0, count: 25 },
        ),
    },
    User: {
      recipes: (parent, args, ctx, info) =>
        ctx.graph.recipes.listAuthoredForUser(
          parent.id,
          args.pagination || { offset: 0, count: 25 },
        ),
      discoveredRecipes: (parent, args, ctx, info) =>
        ctx.graph.recipes.listDiscoveredForUser(
          parent.id,
          args.pagination || { offset: 0, count: 25 },
        ),
      draftRecipes: (parent, args, ctx, info) =>
        ctx.graph.recipes.listDraftsForUser(
          parent.id,
          args.pagination || { offset: 0, count: 25 },
        ),
      likedRecipes: (parent, args, ctx, info) =>
        ctx.graph.recipes.listLikedForUser(
          parent.id,
          args.pagination || { offset: 0, count: 25 },
        ),
    },
  },
  recipeIngredients.resolvers,
  recipeSteps.resolvers,
  yourLike.resolvers,
  likes.resolvers,
].reduce(mergeDeepRight, {});
