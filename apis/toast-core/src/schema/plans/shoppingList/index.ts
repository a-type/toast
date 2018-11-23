import { gql } from 'apollo-server-express';
import { UserInputError, NotFoundError } from 'errors';
import { path } from 'ramda';
import { ShoppingList, Plan } from 'models';
import compileShoppingList from './compileShoppingList';
import { Context } from 'context';
import { dates } from 'tools';
import { setDay, getDay } from 'date-fns';

export const typeDefs = gql`
  type ShoppingListIngredient {
    ingredient: Ingredient!
    totalValue: Float!
    purchasedValue: Float!
    unit: String
  }

  type ShoppingList {
    id: ID!
    startDate: Date!
    endDate: Date!
    ingredients: [ShoppingListIngredient!]!
  }

  extend type Plan {
    """
    Compiles or fetches a cached shopping list for the upcoming week.
    """
    shoppingList: ShoppingList!
  }

  extend type Mutation {
    markPurchased(ingredientId: ID!): ShoppingList!
    markUnpurchased(ingredientId: ID!): ShoppingList!
  }
`;

export const resolvers = {
  Plan: {
    shoppingList: async (parent: Plan, _args, ctx: Context) => {
      const { id: planId, groceryDay } = parent;

      const [startDateIndex, endDateIndex] = ShoppingList.getCurrentRange(
        groceryDay,
      );
      let shoppingList: ShoppingList = await ctx.firestore.plans.getShoppingList(
        planId,
      );

      // if shopping list is the current one...
      if (
        shoppingList &&
        shoppingList.startDateIndex === startDateIndex &&
        shoppingList.endDateIndex === endDateIndex
      ) {
        return shoppingList;
      } else {
        // otherwise we compile a new one
        shoppingList = await compileShoppingList(
          planId,
          startDateIndex,
          endDateIndex,
          ctx,
        );
        await ctx.firestore.plans.setShoppingList(planId, shoppingList);
        return shoppingList;
      }
    },
  },

  Mutation: {
    markPurchased: async (_parent, { ingredientId }, ctx: Context) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const shoppingList = await ctx.firestore.plans.getShoppingList(
        group.planId,
      );
      shoppingList.purchase(ingredientId);
      return ctx.firestore.plans.setShoppingList(group.planId, shoppingList);
    },

    markUnpurchased: async (_parent, { ingredientId }, ctx: Context) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const shoppingList = await ctx.firestore.plans.getShoppingList(
        group.planId,
      );
      shoppingList.unpurchase(ingredientId);
      return ctx.firestore.plans.setShoppingList(group.planId, shoppingList);
    },
  },

  ShoppingList: {
    /**
     * Transforms the ingredient map of a shopping list into
     * a list for the API schema
     */
    ingredients: parent => {
      return Object.values(parent.ingredients);
    },
  },

  ShoppingListIngredient: {
    ingredient: (parent, _args, ctx) => {
      if (parent.ingredient) {
        return parent.ingredient;
      }

      return ctx.graph.ingredients.get(parent.ingredientId);
    },
  },
};
