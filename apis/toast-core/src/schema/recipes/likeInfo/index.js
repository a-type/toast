import { getForRecipe, likeRecipe, unlikeRecipe } from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type LikeInfo {
    id: ID!
    likedAt: String
  }

  extend type Recipe {
    likeInfo: LikeInfo
  }

  extend type Mutation {
    likeRecipe(id: ID!): LikeInfo!
    unlikeRecipe(id: ID!): Recipe
  }
`;

export const resolvers = {
  Recipe: {
    likeInfo: (parent, _args, ctx, _info) => getForRecipe(parent.id, ctx),
  },
  Mutation: {
    likeRecipe: (_parent, { id }, ctx, _info) => likeRecipe(id, ctx),
    unlikeRecipe: (_parent, { id }, ctx, _info) => unlikeRecipe(id, ctx),
  },
};
