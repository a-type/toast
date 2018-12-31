import { gql } from 'apollo-server-express';
import { Context } from 'context';

export const typeDefs = gql`
  enum CorrectionStatus {
    Submitted
    Accepted
    Rejected
  }

  type RecipeIngredientCorrectedValue {
    unit: String
    unitTextMatch: String
    value: Float
    valueTextMatch: String
    ingredientTextMatch: String
    ingredient: Ingredient
  }

  type RecipeIngredientCorrection {
    id: ID!
    type: CorrectionType!
    resourceId: String!
    correctedValue:
  }

  extend type Query {

  }

  extend type Mutation {

  }
`;
