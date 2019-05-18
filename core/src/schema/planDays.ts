import { gql } from 'apollo-server-express';
import { Context } from 'context';

export const typeDefs = gql`
  type PlanDay {
    id: ID!
    date: Date!
  }

  extend type Group {
    planDays(first: Int, offset: Int): [PlanDay!]! @relation(name: "HAS_PLAN_DAY", direction: "OUT")
  }
`;

export const resolvers = {};
