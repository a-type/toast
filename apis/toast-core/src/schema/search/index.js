import { searchIngredients, searchRecipes } from './service';

export const typeDefs = `
type RecipeSearchResponse {
  total: Int!
  items: [Recipe]!
}

type IngredientSearchResponse {
  total: Int!
  items: [Ingredient]!
}

input RecipeSearchInput {
  term: String
  ingredients: IngredientFilterInput
}

input IngredientFilterInput {
  include: [ID!]
  exclude: [ID!]
}

input IngredientSearchInput {
  term: String
}

extend type Query {
  searchRecipes(input: RecipeSearchInput!): RecipeSearchResponse!
  searchIngredients(input: IngredientSearchInput!): IngredientSearchResponse!
}
`;

export const resolvers = {
  Query: {
    searchIngredients: async (_parent, args, ctx, info) => {
      const ingredients = await searchIngredients(args.input.term, ctx);
      return ingredients;
    },
    searchRecipes: async (_parent, args, ctx, info) => {
      const recipes = await searchRecipes(args.input, ctx);
      return recipes;
    }
  }
};
