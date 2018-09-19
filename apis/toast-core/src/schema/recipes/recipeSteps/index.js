import {
  getForRecipe,
  createRecipeStep,
  updateRecipeStep,
  moveRecipeStep,
  deleteRecipeStep,
} from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type RecipeStep {
    id: ID!
    index: Int!
    step: Step!
      @cypher(statement: "MATCH ()<-[this]-(s:Step) return s { .text, .id }")
  }

  input RecipeStepCreateInput {
    text: String!
  }

  input RecipeStepUpdateInput {
    text: String
  }

  extend type Recipe {
    steps: [RecipeStep!]!
  }

  extend type Mutation {
    updateRecipeStep(id: ID!, input: RecipeStepUpdateInput!): RecipeStep!
      @hasScope(scope: "update:fullRecipe")
    createRecipeStep(recipeId: ID!, input: RecipeStepCreateInput!): Recipe!
      @hasScope(scope: "update:fullRecipe")
    moveRecipeStep(recipeId: ID!, input: ListMoveInput!): Recipe!
      @hasScope(scope: "update:fullRecipe")
    deleteRecipeStep(id: ID!): Recipe! @hasScope(scope: "update:fullRecipe")
  }
`;

export const resolvers = {
  Recipe: {
    steps: (parent, args, ctx, info) => getForRecipe(parent.id, ctx),
  },
  Mutation: {
    createRecipeStep: (parent, args, ctx, info) =>
      createRecipeStep(args.recipeId, args.input, ctx),
    updateRecipeStep: (parent, args, ctx, info) =>
      updateRecipeStep(args.id, args.input, ctx),
    moveRecipeStep: (parent, args, ctx, info) =>
      moveRecipeStep(args.recipeId, args.input, ctx),
    deleteRecipeStep: (parent, args, ctx, info) =>
      deleteRecipeStep(args.id, ctx),
  },
};
