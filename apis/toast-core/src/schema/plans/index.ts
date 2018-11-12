import { gql } from 'apollo-server-express';
import { id } from 'tools';
import { path, mergeDeepRight } from 'ramda';
import { UserInputError } from 'errors';
import Plan from 'models/Plan';

import * as weeks from './weeks';

export const typeDefs = () => [
  gql`
    enum PrepAvailability {
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

    type PlanMeal {
      id: ID!
      availability: PrepAvailability!
      dayIndex: Int!
      mealIndex: Int!
    }

    type Plan {
      id: ID!
      defaultServings: Int!
      meals: [PlanMeal!]!
      groceryDay: Int!
      warnings: [String!]!
      strategy: PlanStrategy
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
    }

    extend type Group {
      plan: Plan @authenticated
    }

    extend type Query {
      """
      The start date of the entire plan system. You can reference this
      to determine the chronology of plan weeks in conjunction with
      planWeekIndex and the weekIndex field on Plan itself
      """
      planStartWeekDate: Date!
      """
      A shortcut for me.group.plan
      """
      plan: Plan @authenticated
    }
  `,
  weeks.typeDefs,
];

export const resolvers = [
  {
    Query: {
      planStartWeekDate: (_parent, _args, ctx) =>
        ctx.firestore.plans.START_WEEK_DAY,

      plan: async (_parent, _args, ctx) => {
        const group = await ctx.graph.groups.getMine();
        let planId = path(['planId'], group);

        if (!planId) {
          return null;
        }

        const plan = await ctx.firestore.plans.get(planId);
        ctx.plan = plan;
        ctx.planId = plan ? plan.id : null;
        return plan;
      },
    },

    Mutation: {
      setPlanDetails: async (_parent, { details }, ctx) => {
        const group = await ctx.graph.groups.getMine();
        let planId = path<string>(['planId'], group);
        // create plan if it doesn't exist
        if (!planId) {
          planId = id('plan');
          await ctx.graph.groups.mergeMine({ planId });
        }

        const defaultPlan = new Plan();
        defaultPlan.id = planId;
        const plan = (await ctx.firestore.plans.get(planId)) || defaultPlan;
        plan.defaultServings = details.defaultServings;
        plan.groceryDay = details.groceryDay;
        return ctx.firestore.plans.set(planId, plan);
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
        await ctx.firestore.plans.set(group.planId, plan);
        return plan;
      },
    },

    Group: {
      plan: async (parent, args, ctx) => {
        const { planId } = parent;
        const plan = await ctx.firestore.plans.get(planId);
        ctx.plan = plan;
        ctx.planId = planId;
        return plan;
      },
    },
  },
  weeks.resolvers,
].reduce(mergeDeepRight, {});
