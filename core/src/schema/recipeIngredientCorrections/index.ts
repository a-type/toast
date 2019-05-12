import { gql } from 'apollo-server-express';
import { Context } from 'context';
import { pathOr } from 'ramda';
import { RecipeIngredientCorrection } from 'models';
import { id, removeUndefined } from 'tools';
import {
  CorrectionStatus,
  CorrectionType,
} from 'models/RecipeIngredientCorrection';
import { neo4jgraphql } from 'neo4j-graphql-js';
import logger from 'logger';
import { GraphQLResolveInfo } from 'graphql';

export const typeDefs = gql`
  enum CorrectionStatus {
    Submitted
    Accepted
    Rejected
  }

  enum CorrectionType {
    Change
    Delete
    Add
  }

  type RecipeIngredientCorrectedValue {
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float
    quantityStart: Int
    quantityEnd: Int
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
    recipe: Recipe
      @cypher(
        statement: """
        MATCH (recipe:Recipe{id:$recipeId})
        RETURN recipe
        """
      )
    recipeIngredient: RecipeIngredient
      @cypher(
        statement: """
        MATCH (recipeIngredient:RecipeIngredient{id:$recipeIngredientId})
        RETURN recipeIngredient
        """
      )
  }

  input RecipeIngredientCorrectedValueInput {
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float
    quantityStart: Int
    quantityEnd: Int
    ingredientId: String
    ingredientStart: Int
    ingredientEnd: Int
    text: String
  }

  input RecipeIngredientCorrectionSubmitInput {
    recipeIngredientId: String
    recipeId: String!
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
    ): [RecipeIngredientCorrection!]! @hasClaim(claim: "admin")
  }

  extend type Mutation {
    submitRecipeIngredientCorrection(
      input: RecipeIngredientCorrectionSubmitInput!
    ): RecipeIngredientCorrection! @authenticated

    acceptRecipeIngredientCorrection(id: ID!): RecipeIngredientCorrection!
      @hasClaim(claim: "admin")
    rejectRecipeIngredientCorrection(id: ID!): RecipeIngredientCorrection!
      @hasClaim(claim: "admin")
  }
`;

const applyCorrection = async (
  correction: RecipeIngredientCorrection,
  ctx: Context,
) => {
  if (correction.correctionType === CorrectionType.Change) {
    await ctx.graph.recipeIngredients.update(
      correction.recipeIngredientId,
      removeUndefined(correction.correctedValue),
    );
  } else if (correction.correctionType === CorrectionType.Delete) {
    await ctx.graph.recipeIngredients.delete(correction.recipeIngredientId);
  } else if (correction.correctionType === CorrectionType.Add) {
    await ctx.graph.recipeIngredients.create(
      correction.recipeId,
      removeUndefined(correction.correctedValue),
    );
  }
};

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
        recipeId: args.input.recipeId,
      });

      const recipe = await ctx.graph.recipes.get(args.input.recipeId);
      if (!recipe.published) {
        // for unpublished or private recipes (private: TODO), skip approval process
        await applyCorrection(correction, ctx);
        correction.status = CorrectionStatus.Accepted;
        return correction;
      }

      const result = await ctx.firestore.recipeIngredientCorrections.set(
        correction,
      );
      return result;
    },

    acceptRecipeIngredientCorrection: async (_parent, { id }, ctx: Context) => {
      const correction = await ctx.firestore.recipeIngredientCorrections.get(
        id,
      );

      await applyCorrection(correction, ctx);

      correction.status = CorrectionStatus.Accepted;
      await ctx.firestore.recipeIngredientCorrections.set(correction);

      // update ingredient to improve matching
      try {
        if (
          correction.correctedValue.ingredientId &&
          correction.correctedValue.ingredientStart &&
          correction.correctedValue.ingredientEnd
        ) {
          const ingredientText = correction.correctedValue.text.slice(
            correction.correctedValue.ingredientStart,
            correction.correctedValue.ingredientEnd,
          );
          await ctx.graph.ingredients.addSearchHelper(
            correction.correctedValue.ingredientId,
            ingredientText,
          );
        }
      } catch (err) {
        logger.fatal('Failed to add ingredient search helper', err);
        // don't fail the request
      }

      return correction;
    },

    rejectRecipeIngredientCorrection: async (_parent, { id }, ctx: Context) => {
      const correction = await ctx.firestore.recipeIngredientCorrections.get(
        id,
      );
      correction.status = CorrectionStatus.Rejected;
      await ctx.firestore.recipeIngredientCorrections.set(correction);
      return correction;
    },
  },

  RecipeIngredientCorrection: {
    recipe: (parent, args, ctx, info) => {
      // if (!parent.recipeId) {
      //   return null;
      // }
      // return neo4jgraphql(
      //   parent,
      //   { ...args, recipeId: parent.recipeId },
      //   ctx,
      //   info,
      // );
      // FIXME... https://github.com/neo4j-graphql/neo4j-graphql-js/issues/241
      return null;
    },
    recipeIngredient: (parent, args, ctx, info: GraphQLResolveInfo) => {
      // if (!parent.recipeIngredientId) {
      //   return null;
      // }

      // info.operation.operation = 'query'; // trick neo4jgraphl?

      // return neo4jgraphql(
      //   parent,
      //   { ...args, recipeIngredientId: parent.recipeIngredientId },
      //   ctx,
      //   info,
      // );

      // FIXME... https://github.com/neo4j-graphql/neo4j-graphql-js/issues/241
      return null;
    },
  },
};
