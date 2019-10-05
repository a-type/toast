import { aql } from 'toast-common';
import { resolver as arango } from 'graphql-arangodb';
import { Context } from 'context';
import { NotFoundError, ForbiddenError } from 'errors';

export default {
  Mutation: {
    createStep: async (parent, args, ctx: Context, info) => {
      const result = await ctx.arangoDb.query(aql`
        LET recipe = FIRST(
          FOR r IN OUTBOUND DOCUMENT(Users, ${ctx.user.id}) AuthorOf
            FILTER r._key == ${args.input.recipeId}
            LIMIT 1
            RETURN r
        )
        LET step = FIRST(
          INSERT {
            text: ${args.input.text}
          } INTO Steps OPTIONS { waitForSync: true }
          RETURN NEW
        )
        INSERT {
          _to: recipe._id,
          _from: step._id
        } INTO StepOf
        RETURN {
          step: step,
          recipe: recipe
        }
      `);

      const value = await result.next();

      // add step to recipe step order
      const recipeResult = await ctx.arangoDb.query(aql`
        LET recipe = DOCUMENT(Recipes, ${value.recipe})
        UPDATE recipe._key WITH {
          stepOrder: APPEND(NOT_NULL(recipe.stepOrder, []), ${value.step._key})
        } IN Recipes OPTIONS { waitForSync: true }
        RETURN NEW
      `);

      const recipeValue = await recipeResult.next();

      return {
        recipe: recipeValue,
        stepEdge: {
          node: value.step,
          cursor: value.step._key,
        },
      };
    },
    updateStep: async (parent, args, ctx: Context, info) => {
      await authorizeStep(args, ctx);

      return arango.runCustomQuery({
        parent,
        args,
        context: ctx,
        info,
        query: aql`
          LET step = DOCUMENT(Steps, ${args.input.id})
          UPDATE step._key WITH {
            text: NOT_NULL(${args.input.text}, step.text)
          } IN Steps OPTIONS { waitForSync: true }
          RETURN {
            step: NEW
          }
        `,
      });
    },
    deleteStep: async (parent, args, ctx: Context, info) => {
      await authorizeStep(args, ctx);

      const getDeleteItemsResult = await ctx.arangoDb.query(aql`
          LET step = DOCUMENT(Steps, ${args.input.id})
          LET recipeEdgeResult = FIRST(
            FOR recipeNode, recipeEdge IN OUTBOUND step StepOf
              LIMIT 1
              REMOVE recipeEdge._key IN StepOf
              RETURN { recipeEdgeKey: recipeEdge._key, recipe: recipeNode }
          )
          RETURN { stepOfKey: recipeEdgeResult.recipeEdgeKey, recipe: recipeEdgeResult.recipe }
        `);

      const { stepOfKey, recipe } = await getDeleteItemsResult.next();

      await ctx.arangoDb.query(
        aql`REMOVE ${stepOfKey} IN StepOf OPTIONS { ignoreErrors: true }`,
      );

      const result = await ctx.arangoDb.query(aql`
          REMOVE ${args.input.id} IN Steps
          RETURN OLD
        `);

      if (!result.hasNext()) {
        throw new NotFoundError('Step', args.input.id);
      }

      const step = await result.next();

      return {
        step,
        recipe,
      };
    },
  },
};

const authorizeStep = async (args, ctx: Context) => {
  const authorResult = await ctx.arangoDb.query(aql`
  LET step = DOCUMENT(Steps, ${args.input.id})
  LET recipe = FIRST(
    FOR r IN OUTBOUND step StepOf
      LIMIT 1
      RETURN r
  )
  LET author = FIRST(
    FOR a IN INBOUND recipe AuthorOf
      LIMIT 1
      RETURN a
  )
  RETURN author
`);

  const author = await authorResult.next();

  if (author._key !== ctx.user.id) {
    throw new ForbiddenError(
      "You can't update an step unless you're the author of the recipe",
    );
  }
};
