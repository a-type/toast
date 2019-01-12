import * as recipeIngredients from './recipeIngredients';
import * as recipeSteps from './recipeSteps';
import * as yourLike from './yourLike';
import * as likes from './likes';
import { mergeDeepRight } from 'ramda';
import { gql } from 'apollo-server-express';
import { Context } from 'context';
import logger from 'logger';
import { Recipe } from 'services/graph/sources/Recipes';
import { Ingredient } from 'services/graph/sources/Ingredients';

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

    enum RecipeLinkProblem {
      FailedIngredients
      IncompleteIngredients
      FailedImage
    }

    type RecipeLinkResult {
      recipe: Recipe!
      problems: [RecipeLinkProblem!]!
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
      url: String!
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
      linkRecipe(input: RecipeLinkInput!): RecipeLinkResult!
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

enum RecipeLinkProblem {
  FailedIngredients = 'FailedIngredients',
  IncompleteIngredients = 'IncompleteIngredients',
  FailedImage = 'FailedImage',
}

interface RecipeLinkResult {
  recipe?: Recipe;
  problems: RecipeLinkProblem[];
}

export const resolvers = [
  {
    Query: {
      recipes: (_parent, args, ctx: Context) =>
        ctx.graph.recipes.list(args.pagination),
      recipe: async (_parent, args, ctx: Context) =>
        ctx.graph.recipes.get(args.id),
    },
    Mutation: {
      createRecipe: (_parent, args, ctx: Context) =>
        ctx.graph.recipes.create(args.input),
      linkRecipe: async (_parent, args, ctx: Context) => {
        const result: RecipeLinkResult = {
          problems: [],
        };

        const scraped = await ctx.recipeScraper.scrape(args.input.url);

        result.recipe = await ctx.graph.recipes.link({
          title: scraped.title,
          description: scraped.description,
          attribution: scraped.attribution,
          cookTime: scraped.cookTimeMinutes,
          prepTime: scraped.prepTimeMinutes,
          unattendedTime: scraped.unaccountedForTimeMinutes,
          servings: scraped.servings,
          sourceUrl: scraped.source,
        });

        if (scraped.image) {
          try {
            const file = await ctx.recipeScraper.getImagePseudoFile(
              scraped.image,
            );
            const uploaded = await ctx.gcloudStorage.upload(file, 'images');
            await ctx.graph.recipes.updateCoverImage(result.recipe.id, {
              url: uploaded.url,
              id: uploaded.id,
              attribution: scraped.attribution,
            });
          } catch (err) {
            logger.fatal(`Image upload failed for linked recipe`);
            logger.fatal(err);
            // don't fail the whole link due to this...
            result.problems.push(RecipeLinkProblem.FailedImage);
          }
        }

        let recipeIngredients = [];
        try {
          // parse ingredients
          const parsed = await ctx.ingredientParser.parse(
            scraped.ingredients || [],
          );
          // lookup parsed ingredients
          recipeIngredients = await Promise.all(
            parsed.map(async parsed => {
              let ingredient: Ingredient;
              try {
                ingredient = await ctx.graph.ingredients.searchForBestMatchOrCreate(
                  parsed.ingredient.normalized,
                );
              } catch (err) {
                logger.fatal(err);
                result.problems.push(RecipeLinkProblem.IncompleteIngredients);
              }

              return ctx.graph.recipeIngredients.create(
                result.recipe.id,
                ingredient && ingredient.id,
                {
                  unit: parsed.unit.normalized,
                  unitTextMatch: parsed.unit.raw,
                  value: parsed.value.normalized,
                  valueTextMatch: parsed.value.raw,
                  ingredientTextMatch: parsed.ingredient.raw,
                  text: parsed.original,
                },
              );
            }),
          );
        } catch (err) {
          logger.fatal(`Ingredient parsing failed`);
          logger.fatal(err);
          // again, don't fail the whole link due to this
        }

        result.recipe.ingredients = recipeIngredients;

        return result;
      },
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
