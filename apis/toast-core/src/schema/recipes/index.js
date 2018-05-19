import { neo4jgraphql } from 'neo4j-graphql-js';
import { createRecipe, updateRecipe, getRecipe, listRecipes } from './service';
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

input RecipeUpdateInput {
  title: String
  description: String
  ingredients: RecipeIngredientsUpdateInput
  steps: RecipeStepsUpdateInput
  coverImage: ImageCreateInput
}

input RecipeIngredientsUpdateInput {
  set: RecipeIngredientSetInput
  push: RecipeIngredientCreateInput
  move: ListMoveInput
}

input RecipeIngredientSetInput {
  id: ID!
  ingredient: RecipeIngredientUpdateInput!
}

input RecipeIngredientCreateInput {
  ingredientId: ID!
  unit: String!
  unitValue: Float!
}

input RecipeIngredientUpdateInput {
  unit: String
  unitValue: Float
}

input ListMoveInput {
  fromIndex: Int!
  toIndex: Int!
}

input RecipeStepsUpdateInput {
  push: RecipeStepCreateInput
  move: ListMoveInput
  set: RecipeStepSetInput
}

input RecipeStepCreateInput {
  text: String!
}

input RecipeStepSetInput {
  id: ID!
  step: RecipeStepUpdateInput!
}

input RecipeStepUpdateInput {
  text: String
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
  updateRecipe(id: ID!, input: RecipeUpdateInput!): Recipe @authenticated @relatedToUser
  deleteRecipe(id: ID!): Recipe @authenticated @relatedToUser
}
`,
  recipeIngredients.typeDefs,
  recipeSteps.typeDefs
];

export const resolvers = [
  {
    Query: {
      recipes: async (_parent, args, ctx, info) => {
        const recipes = await listRecipes(args.input, ctx);
        return recipes;
      },
      recipe: async (_parent, args, ctx, info) => {
        const recipe = await getRecipe(args.id, ctx);
        return recipe;
      }
    },
    Mutation: {
      createRecipe: async (_parent, args, ctx, info) => {
        const recipe = await createRecipe(ctx.user, args.input, ctx);
        return recipe;
      },
      updateRecipe: async (_parent, args, ctx, info) => {
        const recipe = await updateRecipe(args, ctx);
        return recipe;
      }
    }
  },
  recipeIngredients.resolvers,
  recipeSteps.resolvers
].reduce(mergeDeepRight, {});
