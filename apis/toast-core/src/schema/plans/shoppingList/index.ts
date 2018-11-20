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
    Compiles or fetches a cached shopping list for a group of meals by date.
    Omit date parameters and it will fetch the upcoming week
    """
    shoppingList(startDate: Date, endDate: Date): ShoppingList!
  }

  extend type Mutation {
    markPurchased(shoppingListId: ID!, ingredientId: ID!): ShoppingList!
    markUnpurchased(shoppingListId: ID!, ingredientId: ID!): ShoppingList!
  }
`;

export const resolvers = {
  Plan: {
    shoppingList: async (
      parent: Plan,
      { startDate, endDate },
      ctx: Context,
    ) => {
      const { id: planId, groceryDay } = parent;

      let startDateIndex, endDateIndex;

      if (!startDate || !endDate) {
        const today = getDay(Date.now());
        const startCookingDay = groceryDay + 1; // buying groceries the day before we start cooking
        // TODO: deterimine if there's a better way to do this...
        if (today <= groceryDay) {
          startDateIndex =
            dates.getDateIndex(new Date()) + (startCookingDay - today);
          endDateIndex = startDateIndex + 7;
        } else {
          startDateIndex =
            dates.getDateIndex(new Date()) + (7 - (today - startCookingDay));
          endDateIndex = startDateIndex + 7;
        }
      } else {
        startDateIndex = dates.getDateIndex(startDate);
        endDateIndex = dates.getDateIndex(endDate);
      }
      const shoppingListId = ShoppingList.getId(startDateIndex, endDateIndex);

      let shoppingList: ShoppingList = await ctx.firestore.plans.getShoppingList(
        planId,
        shoppingListId,
      );

      if (shoppingList) {
        return shoppingList;
      } else {
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
    markPurchased: async (
      _parent,
      { shoppingListId, ingredientId },
      ctx: Context,
    ) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const shoppingList = await ctx.firestore.plans.getShoppingList(
        group.planId,
        shoppingListId,
      );
      shoppingList.purchase(ingredientId);
      return ctx.firestore.plans.setShoppingList(group.planId, shoppingList);
    },

    markUnpurchased: async (
      _parent,
      { shoppingListId, ingredientId },
      ctx: Context,
    ) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const shoppingList = await ctx.firestore.plans.getShoppingList(
        group.planId,
        shoppingListId,
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
