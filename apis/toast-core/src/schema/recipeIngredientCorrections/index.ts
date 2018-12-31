import { gql } from 'apollo-server-express';
import { Context } from 'context';
import { pathOr } from 'ramda';
import { RecipeIngredientCorrection } from 'models';
import { id } from 'tools';
import { CorrectionStatus } from 'models/RecipeIngredientCorrection/RecipeIngredientCorrection';

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
    status: CorrectionStatus
    recipeIngredientId: String!
    correctedValue: RecipeIngredientCorrectedValue!
  }

  input RecipeIngredientCorrectedValueInput {
    unit: String
    unitTextMatch: String
    value: Float
    valueTextMatch: String
    ingredientId: String
    ingredientTextMatch: String
  }

  input RecipeIngredientCorrectionSubmitInput {
    recipeIngredientId: String!
    correctedValue: RecipeIngredientCorrectedValueInput!
  }

  extend type Query {
    recipeIngredientCorrections(pagination: ListPaginationInput): [RecipeIngredientCorrection!]! @hasScope(scope: "list:recipeIngredientCorrection")
  }

  extend type Mutation {
    submitRecipeIngredientCorrection($input: RecipeIngredientCorrectionSubmitInput!): ID! @hasScope(scope: "create:recipeIngredientCorrection")
  }
`;

export const resolvers = {
  Query: {
    recipeIngredientCorrections: async (_parent, args, ctx: Context) => {
      return ctx.firestore.recipeIngredientCorrections.list(
        pathOr(0, ['pagination', 'offset'], args),
        pathOr(10, ['pagination', 'count'], args),
      );
    },
  },

  Mutation: {
    submitRecipeIngredientCorrection: async (_parent, args, ctx: Context) => {
      const correction = new RecipeIngredientCorrection({
        id: id('recipeIngredientCorrection'),
        recipeIngredientId: args.recipeIngredientId,
        correctedValue: args.correctedValue,
        status: CorrectionStatus.Submitted,
        reportingUserId: ctx.user.id,
      });
      const result = await ctx.firestore.recipeIngredientCorrections.set(
        correction,
      );
      return result.id;
    },
  },
};
