import { gql } from 'apollo-server-express';
import { Context } from 'context';
import { path, mergeDeepRight } from 'ramda';
import { id } from 'tools';

import * as meals from './meals';
import * as schedules from './schedules';

export const typeDefs = () => [
  gql`
    type Plan {
      id: ID!
    }

    extend type Query {
      plan: Plan
    }
  `,
  meals.typeDefs,
  schedules.typeDefs,
];

export const resolvers = [
  {
    Query: {
      plan: async (_parent, args, ctx: Context) => {
        const group = await ctx.graph.groups.getMine();
        let planId = path<string>(['planId'], group);

        if (!planId) {
          planId = id('plan');
          await ctx.graph.groups.mergeMine({ planId });
        }

        const plan = await ctx.firestore.plans.get(planId);

        return plan;
      },
    },
  },
  meals.resolvers,
  schedules.resolvers,
].reduce(mergeDeepRight, {});
