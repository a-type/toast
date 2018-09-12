import { getUserRoles } from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Role {
    id: ID!
    name: String
  }

  extend type User {
    roles: [Role!]!
  }
`;

export const resolvers = {
  User: {
    roles: (parent, args, ctx, info) => getUserRoles(parent.id, ctx),
  },
};
