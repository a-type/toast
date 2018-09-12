import { getRecipeCoverImage, updateRecipeCoverImage } from './service';
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Image {
    id: ID!
    url: String!
    attribution: String
  }

  extend type Recipe {
    coverImage: Image
  }

  input ImageCreateInput {
    file: Upload
    url: String
    attribution: String
  }

  extend type Mutation {
    updateRecipeCoverImage(id: ID!, input: ImageCreateInput!): Recipe!
  }
`;

export const resolvers = {
  Recipe: {
    coverImage: (parent, args, ctx, info) => {
      if (parent.coverImage) {
        return parent.coverImage;
      }

      return getRecipeCoverImage(parent.id, ctx);
    },
  },
  Mutation: {
    updateRecipeCoverImage: (parent, args, ctx, info) =>
      updateRecipeCoverImage(args.id, args.input, ctx),
  },
};
