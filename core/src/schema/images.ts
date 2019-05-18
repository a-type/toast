import { gql } from 'apollo-server-express';
import gcloudStorage from 'services/gcloudStorage';
import { UserInputError } from 'apollo-server-express';

export const typeDefs = gql`
  type Image {
    id: ID!
    url: String!
    attribution: String
  }

  extend type Recipe {
    coverImage: Image @relation(name: "COVER_IMAGE", direction: "OUT")
  }

  input ImageCreateInput {
    file: Upload
    url: String
    attribution: String
  }

  extend type Mutation {
    updateRecipeCoverImage(id: ID!, input: ImageCreateInput!): Recipe!
      @authenticated
  }
`;

export const IMAGE_FIELDS = `.id, .url, .attribution`;

const updateRecipeCoverImage = async (id, input, ctx) => {
  let file = await input.file;
  if (!file && input.url) {
    file = await ctx.recipeScraper.getImagePseudoFile(input.url);
  }

  if (file) {
    const uploaded = await gcloudStorage.upload(file, 'images');
    return ctx.transaction(async tx => {
      const result = await tx.run(
        `
        MATCH (r:Recipe { id: $id })
        MERGE (r)-[:COVER_IMAGE]->(i:Image {id: $imageId, url: $url, attribution: $attribution})
        RETURN r { ${ctx.graph.recipes.dbFields} }, i { ${IMAGE_FIELDS} }
        `,
        {
          id,
          imageId: uploaded.id,
          url: uploaded.url,
          attribution: input.attribution,
        },
      );

      const recipe = result.records[0].get('r');
      recipe.coverImage = result.records[0].get('i');
      return recipe;
    });
  } else {
    return ctx.transaction(async tx => {
      const result = await tx.run(
        `
        MATCH (r:Recipe { id: $id })-[:COVER_IMAGE]->(i:Image)
        SET i.attribution = $attribution
        RETURN r { ${ctx.graph.recipes.dbFields} }, i { ${IMAGE_FIELDS} }
        `,
        {
          id,
          attribution: input.attribution,
        },
      );

      if (result.records.length === 0) {
        throw new UserInputError('You must upload an image first');
      }

      const recipe = result.records[0].get('r');
      recipe.coverImage = result.records[0].get('i');
      return recipe;
    });
  }
};

export const resolvers = {
  Mutation: {
    updateRecipeCoverImage: (parent, args, ctx, info) =>
      updateRecipeCoverImage(args.id, args.input, ctx),
  },
};
