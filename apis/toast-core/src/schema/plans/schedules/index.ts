import { gql } from 'apollo-server-express';
import { path } from 'ramda';
import { UserInputError } from 'errors';
import { Context } from 'context';
import { Plan, Schedule } from 'models';

export const typeDefs = gql`
  enum ScheduleAvailability {
    SKIP
    EAT_OUT
    NONE
    SHORT
    MEDIUM
    LONG
  }

  enum ScheduleStrategy {
    BASIC
    PREP
    BIG_PREP
  }

  type ScheduleMeal {
    id: ID!
    availability: ScheduleAvailability!
    dayIndex: Int!
    mealIndex: Int!
  }

  type Schedule {
    id: ID!
    defaultServings: Int!
    meals: [ScheduleMeal!]!
    groceryDay: Int!
    warnings: [String!]!
    strategy: PlanStrategy
  }

  input ScheduleSetDetailsInput {
    defaultServings: Int
    groceryDay: Int
  }

  input ScheduleSetMealDetailsInput {
    availability: ScheduleAvailability
  }

  extend type Mutation {
    setScheduleDetails(scheduleId: ID, details: ScheduleSetDetailsInput!): Schedule!
      @hasScope(scope: "update:plan")
    setScheduleMealDetails(
      scheduleId: ID
      dayIndex: Int!
      mealIndex: Int!
      details: ScheduleSetMealDetailsInput!
    ): Schedule! @hasScope(scope: "update:plan")
    setScheduleStrategy(scheduleId: ID, strategy: PlanStrategy): Schedule!
  }

  extend type Plan {
    schedule($scheduleId: ID): Schedule @authenticated
  }

  extend type Query {
    """
    A shortcut for getting a schedule from your plan. Pass a schedule ID
    to get a non-default scheule, or omit it to get the default one
    """
    schedule($scheduleId: ID): Schedule @authenticated
  }
`;

export const resolvers = {
  Query: {
    schedule: async (_parent, { scheduleId }, ctx: Context) => {
      const group = await ctx.graph.groups.getMine();
      let planId = path(['planId'], group);

      if (!planId) {
        return null;
      }

      const schedule = await ctx.firestore.plans.getSchedule(
        planId,
        scheduleId,
      );
      return schedule;
    },
  },

  Mutation: {
    setScheduleDetails: async (
      _parent,
      { scheduleId, details },
      ctx: Context,
    ) => {
      const group = await ctx.graph.groups.getMine();
      let planId = path<string>(['planId'], group);
      // create schedule if it doesn't exist
      if (!planId) {
        throw new UserInputError("You can't set your schedule without a plan");
      }

      const defaultSchedule = new Schedule();
      defaultSchedule.id = scheduleId || 'default';
      const schedule =
        (await ctx.firestore.plans.getSchedule(planId, scheduleId)) ||
        defaultSchedule;
      if (details.defaultServings !== null) {
        schedule.defaultServings = details.defaultServings;
      }
      if (details.groceryDay !== null) {
        schedule.groceryDay = details.groceryDay;
      }
      return ctx.firestore.plans.setSchedule(planId, schedule);
    },

    setScheduleMealDetails: async (
      _parent,
      { scheduleId, dayIndex, mealIndex, details },
      ctx: Context,
    ) => {
      const group = await ctx.graph.groups.getMine();

      let planId = path<string>(['planId'], group);
      // create schedule if it doesn't exist
      if (!planId) {
        throw new UserInputError(
          "You can't set your schedule availability without a plan",
        );
      }

      const schedule = await ctx.firestore.plans.getSchedule(
        planId,
        scheduleId,
      );

      schedule.setMealDetails(dayIndex, mealIndex, details);
      await ctx.firestore.plans.setSchedule(planId, schedule);
      return schedule;
    },

    setScheduleStrategy: async (
      _parent,
      { scheduleId, strategy },
      ctx: Context,
    ) => {
      const group = await ctx.graph.groups.getMine();

      let planId = path<string>(['planId'], group);
      // create schedule if it doesn't exist
      if (!planId) {
        throw new UserInputError(
          "You can't set your schedule strategy without a plan",
        );
      }

      const schedule = await ctx.firestore.plans.getSchedule(
        planId,
        scheduleId,
      );
      schedule.strategy = strategy;
      await ctx.firestore.plans.setSchedule(planId, schedule);
      return schedule;
    },
  },

  Plan: {
    schedule: async (parent: Plan, { scheduleId }, ctx: Context) => {
      const { id } = parent;
      const schedule = await ctx.firestore.plans.getSchedule(id, scheduleId);
      return schedule;
    },
  },
};
