import {
  createRecipe,
  updateRecipeDetails,
  getRecipe,
  listRecipes
} from './service';
import * as recipeIngredients from './recipeIngredients';
import * as recipeSteps from './recipeSteps';
import { mergeDeepRight } from 'ramda';

export const typeDefs = () => [
  `
type Recipe {
  id: ID!
  title: String!
  description: String
}

input RecipeCreateInput {
  title: String!
  description: String
}

input RecipeDetailsUpdateInput {
  title: String
  description: String
  coverImage: ImageCreateInput
}

input ImageCreateInput {
  file: Upload!
}

input RecipeListInput {
  offset: Int
  count: Int
}

extend type Query {
  recipes(input: RecipeListInput): [Recipe]!
  recipe(id: ID!): Recipe
}

extend type Mutation {
  createRecipe(input: RecipeCreateInput!): Recipe @authenticated
  updateRecipeDetails(id: ID!, input: RecipeDetailsUpdateInput!): Recipe @authenticated @relatedToUser
  deleteRecipe(id: ID!): Recipe @authenticated @relatedToUser
}
`,
  recipeIngredients.typeDefs,
  recipeSteps.typeDefs
];

export const resolvers = [
  {
    Query: {
      recipes: (_parent, args, ctx, info) => listRecipes(args.input, ctx),
      recipe: (_parent, args, ctx, info) => getRecipe(args.id, ctx)
    },
    Mutation: {
      createRecipe: (_parent, args, ctx, info) =>
        createRecipe(ctx.user, args.input, ctx),
      updateRecipeDetails: (_parent, args, ctx, info) =>
        updateRecipeDetails(args, ctx)
    }
  },
  recipeIngredients.resolvers,
  recipeSteps.resolvers
].reduce(mergeDeepRight, {});
