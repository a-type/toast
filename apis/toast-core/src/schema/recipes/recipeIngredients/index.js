import {
  getForRecipe,
  parseRecipeIngredient,
  reparseRecipeIngredient,
  updateRecipeIngredient,
  moveRecipeIngredient,
  deleteRecipeIngredient
} from './service';

export const typeDefs = `
type RecipeIngredient {
  id: ID!
  text: String!
  ingredient: Ingredient!
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
  updateRecipeIngredient(id: ID!, input: RecipeIngredientUpdateInput!): RecipeIngredient! @authenticated
  reparseRecipeIngredient(id: ID!, input: RecipeIngredientParseInput!): RecipeIngredient! @authenticated
  addRecipeIngredient(recipeId: ID!, input: RecipeIngredientParseInput!): Recipe! @authenticated @relatedToUser(idArg: "recipeId")
  moveRecipeIngredient(recipeId: ID!, input: ListMoveInput!): Recipe! @authenticated @relatedToUser(idArg: "recipeId")
  deleteRecipeIngredient(id: ID!): Recipe! @authenticated
}
`;

export const resolvers = {
  Recipe: {
    ingredients: (parent, args, ctx, info) => getForRecipe(parent.id, ctx)
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
      deleteRecipeIngredient(args.id, ctx)
  }
};
