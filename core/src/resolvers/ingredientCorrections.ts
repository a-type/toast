import { Context } from 'context';
import { IngredientCorrection } from 'models';
import { id } from 'tools';
import { CorrectionStatus, CorrectionType } from 'models/IngredientCorrection';
import logger from 'logger';
import { NotFoundError } from 'errors';

const applyCorrection = async (
  correction: IngredientCorrection,
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
      const { foodId, ...rest } = correctedFields;
      if (foodId) {
        await tx.run(
          `
          MATCH (ing:Ingredient{id:$id}), (food:Food {id:$foodId})
          OPTIONAL MATCH (ing)<-[oldRel:USED_IN]-()
          DELETE oldRel
          MERGE (ing)<-[:USED_IN]-(food)
          `,
          {
            id: correction.ingredientId,
            foodId,
          },
        );
      }

      await tx.run(
        `
        MATCH (ri:Ingredient{id:$id})
        SET ri += $rest
        RETURN ri {.id}
        `,
        {
          id: correction.ingredientId,
          rest,
        },
      );
    });
  } else if (correction.correctionType === CorrectionType.Delete) {
    await ctx.writeTransaction(async tx => {
      await tx.run(
        `
      MATCH (ri:Ingredient{id:$id})
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
      const { foodId, ...rest } = correctedFields;
      const ingredientId = id('ingredient');

      await tx.run(
        `
        CREATE (ri:Ingredient{id:$id})
        SET ri += $rest
        `,
        {
          id: ingredientId,
          rest,
        },
      );

      if (foodId) {
        await tx.run(
          `
          MATCH (ri:Ingredient{id:$id}), (food:Food {id:$foodId})
          CREATE (ri)<-[:USED_IN]-(food)
          `,
          {
            id: ingredientId,
            foodId,
          },
        );
      }
    });
  }
};

export default {
  Query: {
    ingredientCorrections: async (_parent, args, ctx: Context) => {
      return ctx.firestore.ingredientCorrections.list(
        args.pagination,
        args.filter,
      );
    },
  },

  Mutation: {
    submitIngredientCorrection: async (_parent, args, ctx: Context) => {
      const correction = new IngredientCorrection({
        id: id('ingredientCorrection'),
        ingredientId: args.input.ingredientId,
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

      const result = await ctx.firestore.ingredientCorrections.set(correction);
      return result;
    },

    acceptIngredientCorrection: async (_parent, { id }, ctx: Context) => {
      const correction = await ctx.firestore.ingredientCorrections.get(id);

      await applyCorrection(correction, ctx);

      correction.status = CorrectionStatus.Accepted;
      await ctx.firestore.ingredientCorrections.set(correction);

      // update ingredient to improve matching
      try {
        if (
          correction.correctedValue.foodId &&
          correction.correctedValue.foodStart &&
          correction.correctedValue.foodEnd
        ) {
          const foodText = correction.correctedText.slice(
            correction.correctedValue.foodStart,
            correction.correctedValue.foodEnd,
          );
          await ctx.writeTransaction(async tx => {
            await tx.run(
              `
              MATCH (food:Food{id:$foodId})
              SET food.searchHelpers = coalesce(food.searchHelpers, []) + $searchHelper
              `,
              {
                foodId: correction.correctedValue.foodId,
                searchHelper: foodText,
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

    rejectIngredientCorrection: async (_parent, { id }, ctx: Context) => {
      const correction = await ctx.firestore.ingredientCorrections.get(id);
      correction.status = CorrectionStatus.Rejected;
      await ctx.firestore.ingredientCorrections.set(correction);
      return correction;
    },
  },
};
