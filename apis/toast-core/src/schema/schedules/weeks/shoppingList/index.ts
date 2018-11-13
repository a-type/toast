import { gql } from 'apollo-server-express';
import { UserInputError, NotFoundError } from 'errors';
import getWeekIndex from '../getWeekIndex';
import { ShoppingList } from 'models';
import compileShoppingList from './compileShoppingList';

export const typeDefs = gql`
  type ShoppingListIngredient {
    ingredient: Ingredient!
    totalValue: Float!
    purchasedValue: Float!
    unit: String
  }

  type ShoppingList {
    id: ID!
    weekIndex: Int!
    ingredients: [ShoppingListIngredient!]!
  }

  extend type PlanWeek {
    shoppingList: ShoppingList!
  }

  extend type Mutation {
    markPurchased(ingredientId: ID!): ShoppingList!
    markUnpurchased(ingredientId: ID!): ShoppingList!
  }
`;

export const resolvers = {
  PlanWeek: {
    shoppingList: async (parent, args, ctx) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      let shoppingList: ShoppingList = await ctx.firestore.plans.getShoppingList(
        group.planId,
        parent.weekIndex,
      );

      if (shoppingList) {
        return shoppingList;
      } else {
        shoppingList = await compileShoppingList(parent, ctx);
        await ctx.firestore.plans.setShoppingList(
          group.planId,
          parent.weekIndex,
          shoppingList,
        );
        return shoppingList;
      }
    },
  },

  Mutation: {
    markPurchased: async (_parent, { ingredientId }, ctx) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const now = new Date();
      const currentWeekIndex = getWeekIndex({
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        startDay: ctx.firestore.plans.START_WEEK_DAY,
      });
      const shoppingList = await ctx.firestore.plans.getShoppingList(
        group.planId,
        currentWeekIndex,
      );
      shoppingList.purchase(ingredientId);
      return ctx.firestore.plans.setShoppingList(
        group.planId,
        currentWeekIndex,
        shoppingList,
      );
    },

    markUnpurchased: async (_parent, { ingredientId }, ctx) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const now = new Date();
      const currentWeekIndex = getWeekIndex({
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        startDay: ctx.firestore.plans.START_WEEK_DAY,
      });
      const shoppingList = await ctx.firestore.plans.getShoppingList(
        group.planId,
        currentWeekIndex,
      );
      shoppingList.unpurchase(ingredientId);
      return ctx.firestore.plans.setShoppingList(
        group.planId,
        currentWeekIndex,
        shoppingList,
      );
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
