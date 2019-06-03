import { Context } from 'context';

export default {
  Mutation: {
    updateRecipe: async (parent, args, ctx: Context, input) => {
      const recipe = await ctx.runCypher();

      if (args.coverImage) {
        const file = await args.input.coverImage.file;
        if (file) {
          const uploaded = await ctx.gcloudStorage.upload(file, 'images');
          await ctx.transaction(async tx => {
            await tx.run(
              `
              MATCH (r:Recipe{id: $id})
              SET r.coverImageUrl = $url, r.coverImageId = $imageId,
                r.coverImageAttribution = $attribution
              `,
              {
                id: args.input.id,
                url: uploaded.url,
                imageId: uploaded.id,
                attribution: args.input.coverImage.attribution,
              },
            );
          });

          return {
            ...recipe,
            coverImageUrl: uploaded.url,
            coverImageAttribution: args.input.coverImage.attribution,
          };
        } else if (args.input.coverImage.attribution) {
          await ctx.transaction(async tx => {
            await tx.run(
              `
              MATCH (r:Recipe{id: $id})
              SET r.coverImageAttribution = $attribution
              `,
              {
                id: args.input.id,
                attribution: args.input.coverImage.attribution,
              },
            );
          });

          return {
            ...recipe,
            coverImageAttribution: args.input.coverImage.attribution,
          };
        }
      }

      return recipe;
    },
    linkRecipe: async (_parent, args, ctx: Context) => {
      const linkResult = await ctx.scanning.linkRecipe(
        args.input.url,
        ctx.user.id,
      );

      return {
        recipeId: linkResult.recipeId,
        problems: linkResult.problems,
      };
    },
  },

  Recipe: {
    locked: parent => (parent.locked === null ? true : parent.locked),
  },
};
