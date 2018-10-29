import { gql } from 'apollo-server-express';
import { id } from 'tools';
import { path, pathOr, assocPath, compose, mergeDeepLeft } from 'ramda';
import { UserInputError } from 'errors';
import getWeekIndex from './getWeekIndex';
import getWeekDay from './getWeekDay';
import Plan from 'services/planner/Plan';

const emptyPlan = {
  days: new Array(7).fill(null).map(() => ({
    meals: new Array(3).fill(null).map(() => ({
      availability: 'SKIP',
      actions: [],
    })),
  })),
};

export const typeDefs = gql`
  enum PrepAvailability {
    SKIP
    EAT_OUT
    NONE
    SHORT
    MEDIUM
    LONG
  }

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

  enum PlanStrategy {
    BASIC
    PREP
    BIG_PREP
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

  type PlanMeal {
    id: ID!
    availability: PrepAvailability!
    actions: [PlanAction!]!
  }

  type PlanDay {
    id: ID!
    date: Date
    meals: [PlanMeal!]!
  }

  type Plan {
    id: ID!
    defaultServings: Int!
    days: [PlanDay!]!
    groceryDay: Int!
    warnings: [String!]!

    """
    Access weekly plans using the week index, which is based
    on the fixed plan chronology system. To calculate a week index
    for any particular day, use the root planWeekIndex query
    """
    week(weekIndex: Int!): Plan

    """
    A date representing the first day (Sunday) of this Plan week,
    if (and only if) this Plan is a weekly plan, and not the root "blueprint" plan
    """
    startDate: Date
  }

  input PlanSetDetailsInput {
    defaultServings: Int
    groceryDay: Int
  }

  input PlanSetMealDetailsInput {
    availability: PrepAvailability
  }

  extend type Mutation {
    setPlanDetails(details: PlanSetDetailsInput!): Plan!
      @hasScope(scope: "update:plan")
    setPlanMealDetails(
      dayIndex: Int!
      mealIndex: Int!
      details: PlanSetMealDetailsInput!
    ): Plan! @hasScope(scope: "update:plan")
    setPlanStrategy(strategy: PlanStrategy): Plan!

    setPlanActionRecipe(
      weekIndex: Int!
      dayIndex: Int!
      mealIndex: Int!
      actionId: ID!
      recipeId: ID!
    ): PlanAction!
  }

  extend type Group {
    plan: Plan @authenticated
  }

  extend type Query {
    """
    A shortcut function to determine the week index of any particular day
    within the planning system
    """
    planWeekIndex(year: Int!, month: Int!, date: Int!): Int!
    """
    The start date of the entire plan system. You can reference this
    to determine the chronology of plan weeks in conjunction with
    planWeekIndex and the weekIndex field on Plan itself
    """
    planStartWeekDate: Date!
  }
`;

export const resolvers = {
  Query: {
    planWeekIndex: (_parent, { year, month, date }, ctx) =>
      getWeekIndex({
        year,
        month,
        date,
        startDay: ctx.firestore.plans.START_WEEK_DAY,
      }),

    planStartWeekDate: (_parent, _args, ctx) =>
      ctx.firestore.plans.START_WEEK_DAY,
  },

  Mutation: {
    setPlanDetails: async (_parent, { details }, ctx) => {
      const group = await ctx.graph.groups.getMine();
      let planId = path(['planId'], group);
      // create plan if it doesn't exist
      if (!planId) {
        planId = id('plan');
        await ctx.graph.groups.mergeMine({ planId });
      }

      const defaultPlan = new Plan({ id: planId });
      const plan = (await ctx.firestore.plans.get(planId)) || defaultPlan;
      plan.defaultServings = details.defaultServings;
      plan.groceryDay = details.groceryDay;
      const processed = ctx.planner.run(plan);
      return ctx.firestore.plans.set(planId, processed);
    },

    setPlanMealDetails: async (
      _parent,
      { dayIndex, mealIndex, details },
      ctx,
    ) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const plan = await ctx.firestore.plans.get(group.planId);

      plan.setMealDetails(dayIndex, mealIndex, details);
      const processed = ctx.planner.run(plan);

      await ctx.firestore.plans.set(group.planId, plan);
      return plan;
    },

    setPlanStrategy: async (_parent, { strategy }, ctx) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const plan = await ctx.firestore.plans.get(group.planId);
      plan.strategy = strategy;
      const processed = ctx.planner.run(plan);
      await ctx.firestore.plans.set(group.planId, processed);
      return processed;
    },

    setPlanActionRecipe: async (
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

  Group: {
    plan: async (parent, args, ctx) => {
      const { planId } = parent;
      const plan = await ctx.firestore.plans.get(planId);
      ctx.plan = plan;
      return plan;
    },
  },

  Plan: {
    week: async (parent, args, ctx) => {
      if (parent.weekIndex !== null) {
        throw new UserInputError(
          "You can't access the week field on a Plan which represents a week already",
        );
      }
      const week = await ctx.firestore.plans.getWeek(parent.id, args.weekIndex);
      ctx.week = week;
      return week;
    },

    startDate: (parent, _args, ctx) => {
      if (!parent.id.includes('week_')) {
        return null;
      }

      return getWeekDay({
        weekIndex: parent.weekIndex,
        startDay: ctx.firestore.plans.START_WEEK_DAY,
      });
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

  PlanActionEat: {
    cookAction: async (parent, args, ctx) => {
      let plan = ctx.week || ctx.plan;
      if (!plan) {
        const group = await ctx.graph.groups.getMine();

        if (!group || !group.planId) {
          throw new UserInputError("You haven't created a plan yet");
        }

        plan = await ctx.firestore.plans.get(group.planId);
      }

      const { cookActionId } = parent;

      return plan.getAction(cookActionId);
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

  PlanDay: {
    date: (parent, args, ctx) => {
      if (ctx.week) {
        const weekIndex = ctx.week.weekIndex;
        const { dayIndex } = parent;

        const date = getWeekDay({
          weekIndex,
          startDay: ctx.firestore.plans.START_WEEK_DAY,
          dayOffset: dayIndex,
        });
        return date;
      }
      return null;
    },
  },
};
