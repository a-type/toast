import { gql } from 'apollo-server-express';
import { id } from 'tools';
import { path, pathOr, assocPath } from 'ramda';
import { UserInputError } from 'errors';

export const typeDefs = gql`
  enum PrepAvailability {
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
    type: PlanActionType!
  }

  type PlanActionEatOut {
    type: PlanActionType!
    note: String
  }

  type PlanActionCook {
    type: PlanActionType!
    servings: Int!
    mealType: PlanMealType!
  }

  type PlanActionEat {
    type: PlanActionType!
    meal: PlanMeal!
    leftovers: Boolean!
  }

  type PlanActionReadyMade {
    type: PlanActionType!
    note: String
  }

  type PlanActionSkip {
    type: PlanActionType!
  }

  type PlanMeal {
    availability: PrepAvailability!
    actions: [PlanAction!]!
  }

  type PlanDay {
    meals: [PlanMeal!]!
  }

  type Plan {
    id: ID!
    servingsPerMeal: Int!
    days: [PlanDay!]!
    groceryDay: Int!
    warnings: [String!]!
  }

  input PlanSetDetailsInput {
    servingsPerMeal: Int
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
    processPlan(strategy: PlanStrategy): Plan!
  }

  extend type Group {
    plan: Plan! @authenticated
  }
`;

export const resolvers = {
  Mutation: {
    setPlanDetails: async (_parent, args, ctx) => {
      const group = await ctx.graph.groups.getMine();
      let planId = path(['planId'], group);
      // create plan if it doesn't exist
      if (!planId) {
        planId = id('plan');
        await ctx.graph.groups.mergeMine({ planId });
      }

      const emptyPlan = {
        id: planId,
        days: new Array(7).fill(null).map(() => ({
          meals: new Array(3).fill(null).map(() => ({
            availability: 'NONE',
            actions: [],
          })),
        })),
      };
      const plan = (await ctx.firestore.plans.get(planId)) || emptyPlan;
      return ctx.firestore.plans.set(planId, { ...plan, ...args.details });
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

      // mutation... yeah, bad. but... serviceable.
      const meal = pathOr({}, ['days', dayIndex, 'meals', mealIndex], plan);
      const updatedPlan = assocPath(
        ['days', dayIndex, 'meals', mealIndex],
        {
          ...meal,
          ...details,
        },
        plan,
      );

      await ctx.firestore.plans.set(group.planId, updatedPlan);
      return plan;
    },

    processPlan: async (_parent, { strategy }, ctx) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const plan = await ctx.firestore.plans.get(group.planId);
      const processed = ctx.planner.run(plan, strategy);
      await ctx.firestore.plans.set(group.planId, processed);
      return processed;
    },
  },

  Group: {
    plan: (parent, args, ctx) => {
      const { planId } = parent;
      return ctx.firestore.plans.get(planId);
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
};
