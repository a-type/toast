import { gql } from 'apollo-server-express';
import { Context } from 'context';

export const typeDefs = gql`
  type Group {
    id: ID!
  }

  extend type User {
    group: Group @authenticated
  }

  extend type Query {
    """
    Shortcut to the user's group
    """
    group: Group @authenticated
  }
`;

export const resolvers = {
  User: {
    group: (parent, args, ctx) => {
      if (parent.id === ctx.user.id) {
        return ctx.graph.groups.getMine();
      }
      return null;
    },
  },

  Query: {
    group: (_parent, args, ctx: Context) => {
      return ctx.graph.groups.getMine();
    },
  },
};
