import { gql, UserInputError } from 'apollo-server-express';
import { path, mergeDeepRight } from 'ramda';
import { NotFoundError } from 'errors';
import getWeekIndex from './getWeekIndex';
import logger from 'logger';

import * as shoppingList from './shoppingList';

export const typeDefs = () => [
  gql`
    enum PlanActionType {
      EAT_OUT
      COOK
      EAT
      READY_MADE
      SKIP
    }

    enum PlanMealType {
      QUICK
      BIG
      FANCY
      NORMAL
    }

    interface PlanAction {
      id: ID!
      type: PlanActionType!
      dayIndex: Int
      mealIndex: Int
    }

    type PlanActionEatOut implements PlanAction {
      id: ID!
      type: PlanActionType!
      dayIndex: Int
      mealIndex: Int
      note: String
    }

    type PlanActionCook implements PlanAction {
      id: ID!
      type: PlanActionType!
      dayIndex: Int
      mealIndex: Int
      servings: Int!
      mealType: PlanMealType!
      recipe: Recipe
    }

    type PlanActionEat implements PlanAction {
      id: ID!
      type: PlanActionType!
      dayIndex: Int
      mealIndex: Int
      leftovers: Boolean!
      cookAction: PlanActionCook
    }

    type PlanActionReadyMade implements PlanAction {
      id: ID!
      type: PlanActionType!
      dayIndex: Int
      mealIndex: Int
      note: String
    }

    type PlanActionSkip implements PlanAction {
      id: ID!
      type: PlanActionType!
      dayIndex: Int
      mealIndex: Int
    }

    type PlanWeekMeal {
      id: ID!
      weekIndex: Int!
      mealIndex: Int!
      dayIndex: Int!
      actions: [PlanAction!]!
    }

    type PlanWeek {
      id: ID!
      weekIndex: Int!
      startDay: Int!
      startMeal: Int!
      mealsPerDay: Int!
      startDate: Date!
      meals: [PlanWeekMeal!]!
    }

    extend type Plan {
      week(weekIndex: Int!): PlanWeek
    }

    extend type Mutation {
      setWeekActionRecipe(
        weekIndex: Int!
        actionId: ID!
        recipeId: ID!
      ): PlanAction!
    }

    extend type Query {
      """
      A shortcut function to determine the week index of any particular day
      within the planning system
      """
      planWeekIndex(year: Int!, month: Int!, date: Int!): Int!
      """
      A shortcut for me.group.plan.week
      """
      week(weekIndex: Int!): PlanWeek @authenticated
    }
  `,

  shoppingList.typeDefs,
];

const getPlanId = async ctx => {
  const group = await ctx.graph.groups.getMine();
  return path(['planId'], group);
};

export const resolvers = [
  {
    Query: {
      planWeekIndex: (_parent, { year, month, date }, ctx) =>
        getWeekIndex({
          year,
          month,
          date,
          startDay: ctx.firestore.plans.START_WEEK_DAY,
        }),

      week: async (_parent, { weekIndex }, ctx) => {
        const planId = ctx.planId || (await getPlanId(ctx));

        if (!planId) {
          return null;
        }

        const week = await ctx.firestore.plans.getWeek(planId, weekIndex);
        ctx.week = week;
        ctx.planId = planId;
        return week;
      },
    },

    Mutation: {
      setWeekActionRecipe: async (
        _parent,
        { weekIndex, dayIndex, mealIndex, actionId, recipeId },
        ctx,
      ) => {
        const group = await ctx.graph.groups.getMine();

        if (!group || !group.planId) {
          throw new UserInputError("You haven't created a plan yet");
        }

        const plan = await ctx.firestore.plans.getWeek(group.planId, weekIndex);
        const action = plan.setActionRecipe(
          dayIndex,
          mealIndex,
          actionId,
          recipeId,
        );
        await ctx.firestore.plans.mergeWeek(group.planId, weekIndex, plan);
        return action;
      },
    },

    Plan: {
      week: async (parent, args, ctx) => {
        const week = await ctx.firestore.plans.getWeek(
          parent.id,
          args.weekIndex,
        );
        ctx.week = week;
        return week;
      },
    },

    PlanWeek: {
      startDate: parent => {
        return parent.startDate;
      },
    },

    PlanActionEat: {
      cookAction: async (parent, args, ctx) => {
        let week = ctx.week;
        if (!week) {
          logger.fatal('Tried to access eat action without week context');
          throw new Error(
            "Something strange happened. We'll be looking into it.",
          );
        }

        const { cookActionId } = parent;

        return week.getAction(cookActionId);
      },
    },

    PlanActionCook: {
      recipe: async (parent, args, ctx) => {
        if (!parent.recipeId) {
          return null;
        }

        return ctx.graph.recipes.get(parent.recipeId);
      },
    },

    PlanAction: {
      __resolveType: obj => {
        switch (obj.type) {
          case 'COOK':
            return 'PlanActionCook';
          case 'EAT':
            return 'PlanActionEat';
          case 'EAT_OUT':
            return 'PlanActionEatOut';
          case 'READY_MADE':
            return 'PlanActionReadyMade';
          case 'SKIP':
            return 'PlanActionSkip';
        }
      },
    },
  },
  shoppingList.resolvers,
].reduce(mergeDeepRight, {});
