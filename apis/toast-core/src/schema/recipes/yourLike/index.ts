import { getForRecipe, likeRecipe, unlikeRecipe } from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type LikeInfo {
    id: ID!
    likedAt: String
  }

  extend type Recipe {
    yourLike: LikeInfo
  }

  extend type Mutation {
    likeRecipe(id: ID!): Recipe! @authenticated
    unlikeRecipe(id: ID!): Recipe! @authenticated
  }
`;

export const resolvers = {
  Recipe: {
    yourLike: async (parent, _args, ctx, _info) =>
      ctx.user ? getForRecipe(parent.id, ctx) : null,
  },
  Mutation: {
    likeRecipe: (_parent, { id }, ctx, _info) => likeRecipe(id, ctx),
    unlikeRecipe: (_parent, { id }, ctx, _info) => unlikeRecipe(id, ctx),
  },
};
