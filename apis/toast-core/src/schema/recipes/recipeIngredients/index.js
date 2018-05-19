import { neo4jgraphql } from 'neo4j-graphql-js';
import { getForRecipe } from './service';

export const typeDefs = `
type RecipeIngredient {
  id: ID!
  ingredient: Ingredient!
  recipe: Recipe!
  unit: String!
  unitValue: Float!
  index: Int!
}

extend type Recipe {
  ingredients: [RecipeIngredient!]!
}
`;

export const resolvers = {
  Recipe: {
    ingredients: (parent, args, ctx, info) => {
      const ingredients = getForRecipe(parent.id, ctx);
      return ingredients;
    }
  }
};
