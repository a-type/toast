import { gql } from 'apollo-server-express';
import { id } from 'tools';
import { path } from 'ramda';
import { UserInputError } from 'errors';

export const typeDefs = gql`
  enum PrepAvailablility {
    EAT_OUT
    NONE
    SHORT
    LONG
  }

  enum PlanActionType {
    EAT_OUT
    COOK
    EAT
  }

  enum PlanMealType {
    QUICK
    BIG
    FANCY
    NORMAL
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

  type PlanActionPrepared {
    type: PlanActionType!
    meal: PlanMeal!
    leftovers: Boolean!
  }

  type PlanMeal {
    id: ID!
    availability: PrepAvailablility!
    action: PlanAction!
  }

  type PlanDay {
    id: ID!
    breakfast: PlanMeal!
    lunch: PlanMeal!
    dinner: PlanMeal!
    canPrepExtraMeal: Boolean!
  }

  type Plan {
    id: ID!
    servingsPerMeal: Int!
    days: [PlanDay!]!
    groceryDay: Int!
  }

  input PlanSetDetailsInput {
    servingsPerMeal: Int
    groceryDay: Int
  }

  input PlanSetDayAvailabilityInput {
    breakfast: PrepTimeType
    lunch: PrepTimeType
    dinner: PrepTimeType
    canPrepExtraMeal: Boolean
  }

  extend type Mutation {
    setPlanDetails(details: PlanSetDetailsInput!): Plan!
      @hasScope(scope: "update:plan")
    setPlanDayAvailability(
      day: Int!
      dayPlan: PlanSetDayAvailabilityInput!
    ): Plan! @hasScope(scope: "update:plan")
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

      const plan = (await ctx.firestore.plans.get(planId)) || { id: planId };
      return ctx.firestore.plans.set(planId, { ...plan, ...args.details });
    },

    setPlanDayAvailability: async (_parent, { day, dayPlan }, ctx) => {
      const group = await ctx.graph.groups.getMine();

      if (!group || !group.planId) {
        throw new UserInputError("You haven't created a plan yet");
      }

      const plan = await ctx.firestore.plans.get(group.planId);
      plan.days[day] = dayPlan;
      await ctx.firestore.plans.set(group.planId, plan);
      return plan;
    },
  },

  Group: {
    plan: (parent, args, ctx) => {
      const { planId } = parent;
      return ctx.firestore.plans.get(planId);
    },
  },
};
