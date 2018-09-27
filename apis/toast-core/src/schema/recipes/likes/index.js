import { getLikeCountForRecipe } from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  extend type Recipe {
    likes: Int
  }
`;

export const resolvers = {
  Recipe: {
    likes: async (parent, _args, ctx, _info) =>
      getLikeCountForRecipe(parent.id, ctx),
  },
};
