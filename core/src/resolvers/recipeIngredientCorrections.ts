import { Context } from 'context';
import { RecipeIngredientCorrection } from 'models';
import { id, removeUndefined } from 'tools';
import {
  CorrectionStatus,
  CorrectionType,
} from 'models/RecipeIngredientCorrection';
import logger from 'logger';
import { NotFoundError } from 'errors';

const applyCorrection = async (
  correction: RecipeIngredientCorrection,
  ctx: Context,
) => {
  if (correction.correctionType === CorrectionType.Change) {
    let correctedFields = correction.correctedValue;
    if (correction.correctedText) {
      const [parsed] = await ctx.scanning.parseIngredients([
        correction.correctedText,
      ]);
      correctedFields = ctx.scanning.parsedIngredientToRecipeIngredient(parsed);
    }
    await ctx.writeTransaction(async tx => {
      const { ingredientId, ...rest } = correctedFields;
      if (ingredientId) {
        await tx.run(
          `
          MATCH (ri:RecipeIngredient{id:$id}), (ing:Ingredient {id:$ingredientId})
          OPTIONAL MATCH (ri)<-[oldRel:USED_IN]-()
          DELETE oldRel
          MERGE (ri)<-[:USED_IN]-(ing)
          `,
          {
            id: correction.recipeIngredientId,
            ingredientId,
          },
        );
      }

      await tx.run(
        `
        MATCH (ri:RecipeIngredient{id:$id})
        SET ri += $rest
        RETURN ri {.id}
        `,
        {
          id: correction.recipeIngredientId,
          rest,
        },
      );
    });
  } else if (correction.correctionType === CorrectionType.Delete) {
    await ctx.writeTransaction(async tx => {
      await tx.run(
        `
      MATCH (ri:RecipeIngredient{id:$id})
      DETACH DELETE ri
      `,
        {
          id,
        },
      );
    });
  } else if (correction.correctionType === CorrectionType.Add) {
    const [parsed] = await ctx.scanning.parseIngredients([
      correction.correctedText,
    ]);
    const correctedFields = ctx.scanning.parsedIngredientToRecipeIngredient(
      parsed,
    );
    await ctx.writeTransaction(async tx => {
      const { ingredientId, ...rest } = correctedFields;
      const recipeIngredientId = id('recipeIngredient');

      await tx.run(
        `
        CREATE (ri:RecipeIngredient{id:$id})
        SET ri += $rest
        `,
        {
          id: recipeIngredientId,
          rest,
        },
      );

      if (ingredientId) {
        await tx.run(
          `
          MATCH (ri:RecipeIngredient{id:$id}), (ing:Ingredient {id:$ingredientId})
          CREATE (ri)<-[:USED_IN]-(ing)
          `,
          {
            id: recipeIngredientId,
            ingredientId,
          },
        );
      }
    });
  }
};

export default {
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
        correctedText: args.input.correctedText,
        status: CorrectionStatus.Submitted,
        reportingUserId: ctx.user.id,
        correctionType: args.input.correctionType,
        recipeId: args.input.recipeId,
      });

      const recipe = await ctx.readTransaction(async tx => {
        const result = await tx.run(
          `
          MATCH (recipe:Recipe {id: $recipeId})
          RETURN recipe {.published, .private}
          `,
          { recipeId: args.input.recipeId },
        );
        if (!result.records.length) {
          throw new NotFoundError('Recipe', args.input.recipeId);
        }
        return result.records[0].get('recipe');
      });

      if (!recipe.published || recipe.private) {
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
          const ingredientText = correction.correctedText.slice(
            correction.correctedValue.ingredientStart,
            correction.correctedValue.ingredientEnd,
          );
          await ctx.writeTransaction(async tx => {
            await tx.run(
              `
              MATCH (ingredient:Ingredient{id:$ingredientId})
              SET ingredient.searchHelpers = coalesce(ingredient.searchHelpers, []) + $searchHelper
              `,
              {
                ingredientId: correction.correctedValue.ingredientId,
                searchHelper: ingredientText,
              },
            );
          });
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
};
