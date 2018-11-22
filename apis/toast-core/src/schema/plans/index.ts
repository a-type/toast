import { gql, UserInputError } from 'apollo-server-express';
import { Context } from 'context';
import { path, mergeDeepRight } from 'ramda';
import { id } from 'tools';

import * as meals from './meals';
import * as schedules from './schedules';
import * as shoppingList from './shoppingList';
import { Plan } from 'models';

export const typeDefs = () => [
  gql`
    type Plan {
      id: ID!
      groceryDay: Int!
    }

    extend type Query {
      plan: Plan
    }

    extend type Group {
      plan: Plan
    }

    extend type Mutation {
      createPlan: Plan!
      setGroceryDay(groceryDay: Int!): Plan!
    }
  `,
  meals.typeDefs,
  schedules.typeDefs,
  shoppingList.typeDefs,
];

export const resolvers = [
  {
    Query: {
      plan: async (_parent, args, ctx: Context) => {
        const group = await ctx.graph.groups.getMine();
        let planId = path<string>(['planId'], group);

        if (!planId) {
          return null;
        }

        const plan = await ctx.firestore.plans.get(planId);

        return plan;
      },
    },

    Group: {
      plan: async (parent, _args, ctx: Context) => {
        if (parent.planId) {
          return ctx.firestore.plans.get(parent.planId);
        }
        return null;
      },
    },

    Mutation: {
      createPlan: async (_parent, args, ctx: Context) => {
        const planId = id('plan');
        await ctx.graph.groups.mergeMine({ planId });
        const plan = Plan.createEmpty(planId);
        await ctx.firestore.plans.set(plan);
        return plan;
      },

      setGroceryDay: async (_parent, { groceryDay }, ctx: Context) => {
        const group = await ctx.graph.groups.getMine();
        const planId = path<string>(['planId'], group);

        if (!planId) {
          throw new UserInputError(
            'You must create a plan before setting your grocery day',
          );
        }

        const plan = await ctx.firestore.plans.get(planId);
        plan.groceryDay = groceryDay;
        return ctx.firestore.plans.set(plan);
      },
    },
  },
  meals.resolvers,
  schedules.resolvers,
  shoppingList.resolvers,
].reduce(mergeDeepRight, {});
