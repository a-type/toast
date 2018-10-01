import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Group {
    id: ID!
  }

  extend type User {
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
};
