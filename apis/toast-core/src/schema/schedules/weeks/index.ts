import { gql, UserInputError } from 'apollo-server-express';
import { path, mergeDeepRight } from 'ramda';
import { NotFoundError } from 'errors';
import getWeekIndex from './getWeekIndex';
import logger from 'logger';
import { addDays } from 'date-fns';

import * as shoppingList from './shoppingList';
import { Context } from 'context';
import { PlanWeek } from 'models';
import { PlanWeekMeal } from 'models/PlanWeek';

export const typeDefs = () => [
  gql`
    enum PlanActionType {
      EAT_OUT
      COOK
      EAT
      READY_MADE
      SKIP
    }

    enum ScheduleMealType {
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
      mealType: ScheduleMealType!
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
      date: Date!
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

    extend type Schedule {
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
      A shortcut for me.group.schedule.week
      """
      week(weekIndex: Int!): PlanWeek @authenticated
    }
  `,

  shoppingList.typeDefs,
];

const getScheduleId = async ctx => {
  const group = await ctx.graph.groups.getMine();
  return path(['scheduleId'], group);
};

export const resolvers = [
  {
    Query: {
      planWeekIndex: (_parent, { year, month, date }, ctx: Context) =>
        getWeekIndex({
          year,
          month,
          date,
          startDay: ctx.firestore.schedules.START_WEEK_DAY,
        }),

      week: async (_parent, { weekIndex }, ctx) => {
        const scheduleId = ctx['scheduleId'] || (await getScheduleId(ctx));

        if (!scheduleId) {
          return null;
        }

        const week = await ctx.firestore.schedules.getWeek(
          scheduleId,
          weekIndex,
        );
        ctx.week = week;
        ctx.scheduleId = scheduleId;
        return week;
      },
    },

    Mutation: {
      setWeekActionRecipe: async (
        _parent,
        { weekIndex, dayIndex, mealIndex, actionId, recipeId },
        ctx: Context,
      ) => {
        const group = await ctx.graph.groups.getMine();

        if (!group || !group.scheduleId) {
          throw new UserInputError("You haven't created a plan yet");
        }

        const plan = await ctx.firestore.schedules.getWeek(
          group.scheduleId,
          weekIndex,
        );
        const action = plan.setActionRecipe(mealIndex, actionId, recipeId);
        await ctx.firestore.schedules.setWeek(group.scheduleId, weekIndex);
        return action;
      },
    },

    Schedule: {
      week: async (parent, args, ctx: Context) => {
        const week = await ctx.firestore.schedules.getWeek(
          parent.id,
          args.weekIndex,
        );
        ctx['week'] = week;
        return week;
      },
    },

    PlanWeek: {
      startDate: parent => {
        return parent.startDate;
      },
    },

    PlanWeekMeal: {
      date: (parent: PlanWeekMeal, _args, ctx: Context) => {
        const week: PlanWeek = ctx['week'];
        const daysFromStart = (7 + parent.dayIndex - week.startDay) % 7;
        return addDays(week.startDate, daysFromStart);
      },
    },

    PlanActionEat: {
      cookAction: async (parent, args, ctx) => {
        let week = ctx.week;
        if (!week) {
          throw new Error('Tried to access eat action without week context.');
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
