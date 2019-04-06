import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type RecipeIngredient {
    id: ID!
    text: String!
    ingredientStart: Int
    ingredientEnd: Int
    recipe: Recipe!
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float!
    quantityStart: Int
    quantityEnd: Int
    comments: [String!]!
    preparations: [String!]!
  }

  input RecipeIngredientParseInput {
    text: String!
  }

  input RecipeIngredientUpdateInput {
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float
    quantityStart: Int
    quantityEnd: Int
    ingredientId: ID
    ingredientStart: Int
    ingredientEnd: Int
    comments: [String!]
    preparations: [String!]
  }

  extend type Recipe {
    ingredients: [RecipeIngredient!]!
      @relation(name: "INGREDIENT_OF", direction: "IN")
  }
`;

export const resolvers = {
  Recipe: {
    ingredients: parent => {
      if (parent.ingredients) {
        return parent.ingredients;
      }

      return [];
    },

    steps: parent => {
      if (parent.steps) {
        return parent.steps;
      }

      return [];
    },
  },

  RecipeIngredient: {
    quantity: parent => parent.quantity || 1,
    comments: parent => parent.comments || [],
    preparations: parent => parent.preparations || [],
  },
};
