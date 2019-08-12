import { Context } from 'context';
import { resolver as arango } from 'graphql-arangodb';

export default {
  Query: {
    recipe: arango,
  },
  Mutation: {
    createRecipe: arango,
    updateRecipe: arango,
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
    collectRecipe: arango,
    uncollectRecipe: arango,
  },

  Recipe: {
    locked: parent =>
      parent.locked === null
        ? true
        : typeof parent.locked === 'function'
          ? parent.locked()
          : parent.locked,
    views: parent =>
      parent.views === null
        ? 0
        : typeof parent.views === 'function'
          ? Math.round(parent.views()) || 0
          : Math.round(parent.views) || 0,
  },

  RecipeLinkResult: {
    recipe: arango,
  },
};
