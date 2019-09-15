import { resolver as arango } from 'graphql-arangodb';
import { Context } from 'context';
import { aql } from 'toast-common';
import { ForbiddenError, NotFoundError } from 'errors';
import { RecipeIngredient } from 'services/scanning';

export default {
  Mutation: {
    createIngredient: async (parent, args, ctx: Context, info) => {
      const [parsed] = await ctx.scanning.parseIngredients([args.input.text]);

      const result = await ctx.arangoDb.query(aql`
        LET recipe = FIRST(
          FOR r IN OUTBOUND DOCUMENT(Users, ${ctx.user.id}) AuthorOf
            FILTER r._key == ${args.input.recipeId}
            LIMIT 1
            RETURN r
        )
        LET ingredient = FIRST(
          INSERT {
            text: ${parsed.text || ''},
            quantity: ${parsed.quantity || 1},
            unit: ${parsed.unit || null},
            quantityStart: ${parsed.quantityStart || null},
            quantityEnd: ${parsed.quantityEnd || null},
            unitStart: ${parsed.unitStart || null},
            unitEnd: ${parsed.unitEnd || null},
            foodStart: ${parsed.foodStart || null},
            foodEnd: ${parsed.foodEnd || null},
            comments: ${parsed.comments || []},
            preparations: ${parsed.preparations || []}
          } INTO Ingredients OPTIONS { waitForSync: true }
          RETURN NEW
        )
        INSERT {
          _to: recipe._id,
          _from: ingredient._id
        } INTO IngredientOf
        RETURN {
          ingredient: ingredient,
          recipe: recipe
        }
      `);

      const value = await result.next();

      if (parsed.foodId) {
        await ctx.arangoDb.query(aql`
          INSERT {
            _from: ${`Foods/${parsed.foodId}`},
            _to: ${value.ingredient._id}
          } INTO UsedIn
        `);
      }

      return {
        recipe: value.recipe,
        ingredientEdge: {
          node: value.ingredient,
          cursor: value.ingredient._key,
        },
      };
    },
    updateIngredient: async (parent, args, ctx: Context, info) => {
      await authorizeIngredient(args, ctx);

      const ingredientId = args.input.id;

      let parsed: RecipeIngredient;
      if (args.input.text) {
        const parsedList = await ctx.scanning.parseIngredients([
          args.input.text,
        ]);
        parsed = parsedList[0];

        await ctx.arangoDb.query(aql`
          LET ingredient = DOCUMENT(Ingredients, ${ingredientId})
          UPDATE ${ingredientId} WITH {
            text: NOT_NULL(${parsed.text || null}, ingredient.text),
            quantity: NOT_NULL(${parsed.quantity || null}, ingredient.quantity),
            unit: NOT_NULL(${parsed.unit || null}, ingredient.unit),
            quantityStart: NOT_NULL(${parsed.quantityStart ||
              null}, ingredient.quantityStart),
            quantityEnd: NOT_NULL(${parsed.quantityEnd ||
              null}, ingredient.quantityEnd),
            unitStart: NOT_NULL(${parsed.unitStart ||
              null}, ingredient.unitStart),
            unitEnd: NOT_NULL(${parsed.unitEnd || null}, ingredient.unitEnd),
            foodStart: NOT_NULL(${parsed.foodStart ||
              null}, ingredient.foodStart),
            foodEnd: NOT_NULL(${parsed.foodEnd || null}, ingredient.foodEnd),
            comments: NOT_NULL(${parsed.comments || null}, ingredient.comments),
            preparations: NOT_NULL(${parsed.preparations ||
              null}, ingredient.preparations)
          } IN Ingredients OPTIONS { waitForSync: true }
        `);
      }

      const newFoodId = args.input.foodId || parsed.foodId;

      if (newFoodId) {
        // there might not be an existing edge to update
        const foodEdgeResult = await ctx.arangoDb.query(aql`
          LET edge = FIRST(
            FOR food, foodEdge IN INBOUND DOCUMENT(Ingredients, ${ingredientId}) UsedIn
              LIMIT 1
              RETURN foodEdge
          )
          RETURN edge
        `);

        const foodEdge = await foodEdgeResult.next();

        if (foodEdge) {
          await ctx.arangoDb.query(aql`
            LET food = DOCUMENT(Foods, ${newFoodId})
            UPDATE {
              _key: ${foodEdge._key},
              _from: food._id
            } IN UsedIn
          `);
        } else {
          await ctx.arangoDb.query(aql`
            INSERT {
              _to: ${`Ingredients/${ingredientId}`},
              _from: ${`Foods/${newFoodId}`}
            } INTO UsedIn
          `);
        }
      }

      const result = await ctx.arangoDb.query(aql`
        LET ingredient = DOCUMENT(Ingredients, ${ingredientId})
        UPDATE ${ingredientId} WITH {
          text: NOT_NULL(${args.input.text || null}, ingredient.text),
          quantity: NOT_NULL(${args.input.quantity ||
            null}, ingredient.quantity),
          unit: NOT_NULL(${args.input.unit || null}, ingredient.unit),
          quantityStart: NOT_NULL(${args.input.quantityStart ||
            null}, ingredient.quantityStart),
          quantityEnd: NOT_NULL(${args.input.quantityEnd ||
            null}, ingredient.quantityEnd),
          unitStart: NOT_NULL(${args.input.unitStart ||
            null}, ingredient.unitStart),
          unitEnd: NOT_NULL(${args.input.unitEnd || null}, ingredient.unitEnd),
          foodStart: NOT_NULL(${args.input.foodStart ||
            null}, ingredient.foodStart),
          foodEnd: NOT_NULL(${args.input.foodEnd || null}, ingredient.foodEnd),
          comments: NOT_NULL(${args.input.comments ||
            null}, ingredient.comments),
          preparations: NOT_NULL(${args.input.preparations ||
            null}, ingredient.preparations)
        } INTO Ingredients OPTIONS { waitForSync: true }
        RETURN NEW
      `);

      const ingredient = await result.next();

      return {
        ingredient,
      };
    },
    deleteIngredient: async (parent, args, ctx: Context, info) => {
      await authorizeIngredient(args, ctx);

      const getDeleteItemsResult = await ctx.arangoDb.query(aql`
        LET ingredient = DOCUMENT(Ingredients, ${args.input.id})
        LET usedInKey = FIRST(
          FOR food, foodEdge IN INBOUND ingredient UsedIn
            LIMIT 1
            RETURN foodEdge._key
        )
        LET recipeEdgeResult = FIRST(
          FOR recipeNode, recipeEdge IN OUTBOUND ingredient IngredientOf
            LIMIT 1
            REMOVE recipeEdge._key IN IngredientOf
            RETURN { recipeEdgeKey: recipeEdge._key, recipe: recipeNode }
        )
        RETURN { usedInKey: usedInKey, ingredientOfKey: recipeEdgeResult.recipeEdgeKey, recipe: recipeEdgeResult.recipe }
      `);

      const {
        usedInKey,
        ingredientOfKey,
        recipe,
      } = await getDeleteItemsResult.next();

      await ctx.arangoDb.query(aql`
        REMOVE ${usedInKey} IN UsedIn OPTIONS { ignoreErrors: true }
      `);

      await ctx.arangoDb.query(aql`
        REMOVE ${ingredientOfKey} IN IngredientOf OPTIONS { ignoreErrors: true }
      `);

      const result = await ctx.arangoDb.query(aql`
        REMOVE ${args.input.id} IN Ingredients
        RETURN OLD
      `);

      if (!result.hasNext()) {
        throw new NotFoundError('Ingredient', args.input.id);
      }

      const ingredient = await result.next();

      return {
        ingredient,
        recipe,
      };
    },
  },

  CreateIngredientResult: {
    ingredientEdge: arango,
    recipe: arango,
  },
  UpdateIngredientResult: {
    ingredient: arango,
  },
  DeleteIngredientResult: {
    ingredient: arango,
    recipe: arango,
  },
};

const authorizeIngredient = async (args, ctx: Context) => {
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
};
