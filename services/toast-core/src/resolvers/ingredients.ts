import { resolver as arango } from 'graphql-arangodb';
import { Context } from 'context';
import { aql } from 'toast-common';
import { ForbiddenError } from 'errors';

export default {
  Mutation: {
    createIngredient: async (parent, args, ctx: Context, info) => {
      const [parsed] = await ctx.scanning.parseIngredients([args.input.text]);

      const result = await ctx.arangoDb.query(aql`
        LET recipe = FIRST(
          FOR r IN OUTBOUND DOCUMENT(Users, ${ctx.user.id}) AuthorOf
            FILTER r._key == args.input.recipeId
            LIMIT 1
            RETURN r
        )
        LET ingredient = FIRST(
          INSERT {
            text: ${parsed.text},
            quantity: ${parsed.quantity},
            unit: ${parsed.unit},
            quantityStart: ${parsed.quantityStart},
            quantityEnd: ${parsed.quantityEnd},
            unitStart: ${parsed.unitStart},
            unitEnd: ${parsed.unitEnd},
            foodStart: ${parsed.foodStart},
            foodEnd: ${parsed.foodEnd},
            comments: ${parsed.comments},
            preparations: ${parsed.preparations}
          } INTO Ingredients
          RETURN NEW
        )
        INSERT {
          _to: recipe._id,
          _from: ingredient._id
        } INTO IngredientOf
        RETURN ingredient
      `);

      const ingredient = await result.next();

      if (parsed.foodId) {
        await ctx.arangoDb.query(aql`
          INSERT {
            _from: ${`Foods/${parsed.foodId}`},
            _to: ${ingredient._id}
          } INTO UsedIn
        `);
      }

      return {
        ingredient,
      };
    },
    updateIngredient: async (parent, args, ctx: Context, info) => {
      const authorResult = await ctx.arangoDb.query(aql`
        LET ingredient = DOCUMENT(Ingredients, ${args.input.id})
        LET recipe = FIRST(
          FOR r IN OUTBOUND ingredient IngredientOf
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
          "You can't update an ingredient unless you're the author of the recipe",
        );
      }

      // TODO complete
    },
  },
};
