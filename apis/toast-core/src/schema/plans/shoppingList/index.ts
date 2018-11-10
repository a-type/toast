import { gql } from 'apollo-server-express';
import { UserInputError, NotFoundError } from 'errors';
import { addQuantities, subtractQuantities } from '../../../tools/quantities';
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

  extend type Plan {
    shoppingList: ShoppingList!
  }

  extend type Mutation {
    markPurchased(ingredientId: ID!, value: Float!, unit: String): ShoppingList!
  }
`;

export const resolvers = {
  Plan: {
    shoppingList: async (parent, args, ctx) => {
      if (!parent.weekIndex) {
        throw new UserInputError(
          "You can't get a shopping list from the blueprint plan",
        );
      }

      const { planId } = ctx;

      if (!planId) {
        throw new NotFoundError(
          "Can't find a shopping list, no plan was specified.",
        );
      }

      let shoppingList: ShoppingList = await ctx.firestore.plans.getShoppingList(
        planId,
        parent.weekIndex,
      );

      if (shoppingList) {
        return shoppingList;
      } else {
        shoppingList = await compileShoppingList(parent, ctx);
        await ctx.firestore.plans.setShoppingList(
          planId,
          parent.weekIndex,
          shoppingList,
        );
        return shoppingList;
      }
    },
  },

  Mutation: {
    markPurchased: async (_parent, { ingredientId, value, unit }, ctx) => {
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
      shoppingList.addPurchase(ingredientId, { value, unit });
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
