import { getRecipeCoverImage } from './service';

export const typeDefs = `
type Image {
  id: ID!
  url: String!
}

extend type Recipe {
  coverImage: Image
}
`;

export const resolvers = {
  Recipe: {
    coverImage: (parent, args, ctx, info) => {
      const coverImage = getRecipeCoverImage(parent.id, ctx);

      return coverImage;
    }
  }
};
