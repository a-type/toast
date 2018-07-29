import {
  getForRecipe,
  createRecipeStep,
  updateRecipeStep,
  moveRecipeStep
} from './service';

export const typeDefs = `
type RecipeStep {
  id: ID!
  index: Int!
  step: Step! @cypher(
    statement: "MATCH ()<-[this]-(s:Step) return s { .text, .id }"
  )
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
  updateRecipeStep(id: ID!, input: RecipeStepUpdateInput!): RecipeStep! @authenticated
  createRecipeStep(recipeId: ID!, input: RecipeStepCreateInput!): Recipe! @authenticated @relatedToUser(idArg: "recipeId")
  moveRecipeStep(recipeId: ID!, input: ListMoveInput!): Recipe! @authenticated @relatedToUser(idArg: "recipeId")
}
`;

export const resolvers = {
  Recipe: {
    steps: (parent, args, ctx, info) => getForRecipe(parent.id, ctx)
  },
  Mutation: {
    createRecipeStep: (parent, args, ctx, info) =>
      createRecipeStep(args.recipeId, args.input, ctx),
    updateRecipeStep: (parent, args, ctx, info) =>
      updateRecipeStep(args.id, args.input, ctx),
    moveRecipeStep: (parent, args, ctx, info) =>
      moveRecipeStep(args.recipeId, args.input, ctx)
  }
};
