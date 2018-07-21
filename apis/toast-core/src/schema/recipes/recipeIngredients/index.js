import {
  getForRecipe,
  createRecipeIngredient,
  updateRecipeIngredient,
  moveRecipeIngredient
} from './service';

export const typeDefs = `
type RecipeIngredient {
  id: ID!
  ingredient: Ingredient!
  recipe: Recipe!
  unit: String
  unitValue: Float!
  index: Int!
  note: String!
}

input RecipeIngredientCreateInput {
  ingredientId: ID!
  unit: String
  unitValue: Float!
  note: String
}

input RecipeIngredientUpdateInput {
  id: ID!
  unit: String
  unitValue: Float
  note: String
}

extend type Recipe {
  ingredients: [RecipeIngredient!]!
}

extend type Mutation {
  updateRecipeIngredient(id: ID!, input: RecipeIngredientUpdateInput!): RecipeIngredient @authenticated @relatedToUser
  createRecipeIngredient(recipeId: ID!, input: RecipeIngredientCreateInput!): RecipeIngredient @authenticated @relatedToUser(idArg: "recipeId")
  moveRecipeIngredient(recipeId: ID!, input: ListMoveInput!): Recipe @authenticated @relatedToUser(idArg: "recipeId")
}
`;

export const resolvers = {
  Recipe: {
    ingredients: (parent, args, ctx, info) => getForRecipe(parent.id, ctx)
  },
  Mutation: {
    createRecipeIngredient: (parent, args, ctx, info) =>
      createRecipeIngredient(args.recipeId, args.input, ctx),
    updateRecipeIngredient: (parent, args, ctx, info) =>
      updateRecipeIngredient(args.id, args.input, ctx),
    moveRecipeIngredient: (parent, args, ctx, info) =>
      moveRecipeIngredient(args.recipeId, args.input, ctx)
  }
};
