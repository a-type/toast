import { gql } from 'apollo-server-express';
import { Context } from 'context';
import { pathOr } from 'ramda';
import { RecipeIngredientCorrection } from 'models';
import { id, removeUndefined } from 'tools';
import {
  CorrectionStatus,
  CorrectionType,
} from 'models/RecipeIngredientCorrection/RecipeIngredientCorrection';

export const typeDefs = gql`
  enum CorrectionStatus {
    Submitted
    Accepted
    Rejected
  }

  enum CorrectionType {
    Change
    Delete
  }

  type RecipeIngredientCorrectedValue {
    unit: String
    unitStart: Int
    unitEnd: Int
    value: Float
    valueStart: Int
    valueEnd: Int
    ingredientStart: Int
    ingredientEnd: Int
    text: String
  }

  type RecipeIngredientCorrection {
    id: ID!
    status: CorrectionStatus!
    correctionType: CorrectionType!
    recipeIngredientId: String!
    correctedValue: RecipeIngredientCorrectedValue
  }

  input RecipeIngredientCorrectedValueInput {
    unit: String
    unitStart: Int
    unitEnd: Int
    value: Float
    valueStart: Int
    valueEnd: Int
    ingredientId: String
    ingredientStart: Int
    ingredientEnd: Int
    text: String
  }

  input RecipeIngredientCorrectionSubmitInput {
    recipeIngredientId: String!
    correctionType: CorrectionType!
    correctedValue: RecipeIngredientCorrectedValueInput
  }

  input RecipeIngredientCorrectionsFilterInput {
    status: CorrectionStatus
  }

  extend type Query {
    recipeIngredientCorrections(
      pagination: ListPaginationInput
      filter: RecipeIngredientCorrectionsFilterInput
    ): [RecipeIngredientCorrection!]!
      @hasScope(scope: "list:recipeIngredientCorrection")
  }

  extend type Mutation {
    submitRecipeIngredientCorrection(
      input: RecipeIngredientCorrectionSubmitInput!
    ): ID! @hasScope(scope: "create:recipeIngredientCorrection")

    acceptRecipeIngredientCorrection(id: ID!): ID!
    rejectRecipeIngredientCorrection(id: ID!): ID!
  }
`;

export const resolvers = {
  Query: {
    recipeIngredientCorrections: async (_parent, args, ctx: Context) => {
      return ctx.firestore.recipeIngredientCorrections.list(
        args.pagination,
        args.filter,
      );
    },
  },

  Mutation: {
    submitRecipeIngredientCorrection: async (_parent, args, ctx: Context) => {
      const correction = new RecipeIngredientCorrection({
        id: id('recipeIngredientCorrection'),
        recipeIngredientId: args.input.recipeIngredientId,
        correctedValue: args.input.correctedValue,
        status: CorrectionStatus.Submitted,
        reportingUserId: ctx.user.id,
        correctionType: args.input.correctionType,
      });
      const result = await ctx.firestore.recipeIngredientCorrections.set(
        correction,
      );
      return result.id;
    },

    acceptRecipeIngredientCorrection: async (_parent, { id }, ctx: Context) => {
      const correction = await ctx.firestore.recipeIngredientCorrections.get(
        id,
      );

      if (correction.correctionType === CorrectionType.Change) {
        await ctx.graph.recipeIngredients.update(
          correction.recipeIngredientId,
          removeUndefined(correction.correctedValue),
        );
      } else if (correction.correctionType === CorrectionType.Delete) {
        await ctx.graph.recipeIngredients.delete(correction.recipeIngredientId);
      }

      correction.status = CorrectionStatus.Accepted;
      await ctx.firestore.recipeIngredientCorrections.set(correction);

      return correction.id;
    },

    rejectRecipeIngredientCorrection: async (_parent, { id }, ctx: Context) => {
      const correction = await ctx.firestore.recipeIngredientCorrections.get(
        id,
      );
      correction.status = CorrectionStatus.Rejected;
      await ctx.firestore.recipeIngredientCorrections.set(correction);
      return correction.id;
    },
  },
};
