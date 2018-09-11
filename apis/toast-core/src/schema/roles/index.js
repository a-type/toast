import { getUserRoles } from './service';

export const typeDefs = `
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
