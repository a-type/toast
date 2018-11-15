import { gql } from 'apollo-server-express';
import { id } from 'tools';
import { path, mergeDeepRight } from 'ramda';
import { UserInputError } from 'errors';
import Schedule from 'models/Schedule';

import * as weeks from './weeks';
import { Context } from 'context';
import { PlanWeek } from 'models';

export const typeDefs = () => [
  gql`
    enum ScheduleAvailability {
      SKIP
      EAT_OUT
      NONE
      SHORT
      MEDIUM
      LONG
    }

    enum PlanStrategy {
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

      """
      Lets the user preview how a week would look with a particular strategy (even if they don't have access to the strategy)
      """
      previewWeek(strategy: PlanStrategy!): PlanWeek!
    }

    input ScheduleSetDetailsInput {
      defaultServings: Int
      groceryDay: Int
    }

    input ScheduleSetMealDetailsInput {
      availability: ScheduleAvailability
    }

    extend type Mutation {
      setScheduleDetails(details: ScheduleSetDetailsInput!): Schedule!
        @hasScope(scope: "update:plan")
      setScheduleMealDetails(
        dayIndex: Int!
        mealIndex: Int!
        details: ScheduleSetMealDetailsInput!
      ): Schedule! @hasScope(scope: "update:plan")
      setScheduleStrategy(strategy: PlanStrategy): Schedule!
    }

    extend type Group {
      schedule: Schedule @authenticated
    }

    extend type Query {
      """
      The start date of the entire plan system. You can reference this
      to determine the chronology of plan weeks in conjunction with
      planWeekIndex and the weekIndex field on Schedule itself
      """
      scheduleStartWeekDate: Date!
      """
      A shortcut for me.group.schedule
      """
      schedule: Schedule @authenticated
    }
  `,
  ...weeks.typeDefs(),
];

export const resolvers = [
  {
    Query: {
      scheduleStartWeekDate: (_parent, _args, ctx) =>
        ctx.firestore.schedules.START_WEEK_DAY,

      schedule: async (_parent, _args, ctx: Context) => {
        const group = await ctx.graph.groups.getMine();
        let scheduleId = path(['scheduleId'], group);

        if (!scheduleId) {
          return null;
        }

        const schedule = await ctx.firestore.schedules.get(scheduleId);
        ctx['schedule'] = schedule;
        ctx['scheduleId'] = schedule ? schedule.id : null;
        return schedule;
      },
    },

    Mutation: {
      setScheduleDetails: async (_parent, { details }, ctx: Context) => {
        const group = await ctx.graph.groups.getMine();
        let scheduleId = path<string>(['scheduleId'], group);
        // create schedule if it doesn't exist
        if (!scheduleId) {
          scheduleId = id('schedule');
          await ctx.graph.groups.mergeMine({ scheduleId });
        }

        const defaultPlan = new Schedule();
        defaultPlan.id = scheduleId;
        const schedule =
          (await ctx.firestore.schedules.get(scheduleId)) || defaultPlan;
        if (details.defaultServings !== null) {
          schedule.defaultServings = details.defaultServings;
        }
        if (details.groceryDay !== null) {
          schedule.groceryDay = details.groceryDay;
        }
        return ctx.firestore.schedules.set(scheduleId, schedule);
      },

      setScheduleMealDetails: async (
        _parent,
        { dayIndex, mealIndex, details },
        ctx: Context,
      ) => {
        const group = await ctx.graph.groups.getMine();

        if (!group || !group.scheduleId) {
          throw new UserInputError("You haven't created a schedule yet");
        }

        const schedule = await ctx.firestore.schedules.get(group.scheduleId);

        schedule.setMealDetails(dayIndex, mealIndex, details);
        await ctx.firestore.schedules.set(group.scheduleId, schedule);
        return schedule;
      },

      setScheduleStrategy: async (_parent, { strategy }, ctx: Context) => {
        const group = await ctx.graph.groups.getMine();

        if (!group || !group.scheduleId) {
          throw new UserInputError("You haven't created a schedule yet");
        }

        const schedule = await ctx.firestore.schedules.get(group.scheduleId);
        schedule.strategy = strategy;
        await ctx.firestore.schedules.set(group.scheduleId, schedule);
        return schedule;
      },
    },

    Group: {
      schedule: async (parent, args, ctx: Context) => {
        const { scheduleId } = parent;
        const schedule = await ctx.firestore.schedules.get(scheduleId);
        ctx['schedule'] = schedule;
        ctx['scheduleId'] = scheduleId;
        return schedule;
      },
    },

    Schedule: {
      previewWeek: (parent: Schedule, { strategy }, ctx: Context) => {
        const scheduleCopy = Schedule.fromJSON(parent.toJSON());
        scheduleCopy.strategy = strategy;
        const week = PlanWeek.fromSchedule(scheduleCopy, 0);
        ctx['week'] = week;
        return week;
      },
    },
  },
  weeks.resolvers,
].reduce(mergeDeepRight, {});
