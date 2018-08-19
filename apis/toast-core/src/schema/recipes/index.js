import {
  createRecipe,
  updateRecipeDetails,
  getRecipe,
  listRecipes,
  listRecipesForIngredient,
  publishRecipe,
  listRecipesForUser,
  linkRecipe
} from './service';
import * as recipeIngredients from './recipeIngredients';
import * as recipeSteps from './recipeSteps';
import { mergeDeepRight } from 'ramda';

export const typeDefs = () => [
  `
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
}

input RecipeDetailsUpdateInput {
  title: String
  description: String
  attribution: String
  sourceUrl: String
  displayType: RecipeDisplayType
}

extend type Query {
  recipes(pagination: ListPaginationInput): [Recipe!]!
  recipe(id: ID!): Recipe
}

extend type Mutation {
  createRecipe(input: RecipeCreateInput!): Recipe! @authenticated
  linkRecipe(input: RecipeLinkInput!): Recipe! @authenticated
  updateRecipeDetails(id: ID!, input: RecipeDetailsUpdateInput!): Recipe @authenticated @relatedToUser
  publishRecipe(id: ID!): Recipe @authenticated @relatedToUser
}

extend type Ingredient {
  recipes(input: ListPaginationInput): [Recipe!]!
}

extend type User {
  recipes(input: ListPaginationInput): [Recipe!]!
}
`,
  recipeIngredients.typeDefs,
  recipeSteps.typeDefs
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
      }
    },
    Mutation: {
      createRecipe: (_parent, args, ctx, info) => createRecipe(args.input, ctx),
      linkRecipe: (_parent, args, ctx, info) => linkRecipe(args.input, ctx),
      updateRecipeDetails: (_parent, args, ctx, info) =>
        updateRecipeDetails(args.id, args.input, ctx),
      publishRecipe: (_parent, args, ctx, info) => publishRecipe(args.id, ctx)
    },
    Ingredient: {
      recipes: (parent, args, ctx, info) =>
        listRecipesForIngredient(
          parent.id,
          args.input || { offset: 0, count: 25 },
          ctx
        )
    },
    User: {
      recipes: (parent, args, ctx, info) =>
        listRecipesForUser(
          parent.id,
          args.input || { offset: 0, count: 25 },
          ctx
        )
    }
  },
  recipeIngredients.resolvers,
  recipeSteps.resolvers
].reduce(mergeDeepRight, {});
