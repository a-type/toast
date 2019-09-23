import { Context } from 'context';
import { resolver as arango } from 'graphql-arangodb';
import { aql } from 'toast-common';
import { pathOr } from 'ramda';

const pathOrNull = pathOr(null);

export default {
  Query: {
    recipe: arango,
  },
  Mutation: {
    createRecipe: arango,
    updateRecipe: async (parent, args, ctx: Context, info) => {
      let coverImageUrl: string = null;
      if (args.input.coverImage) {
        console.log(args.input.coverImage);
        const { url } = await ctx.gcloudStorage.upload(
          await args.input.coverImage,
          'images',
        );
        coverImageUrl = url;
      }

      return arango.runCustomQuery({
        parent,
        args,
        info,
        context: ctx,
        query: aql`
        LET recipe = FIRST(
          FOR authored_recipe IN OUTBOUND DOCUMENT(Users, $context.userId) AuthorOf
            FILTER authored_recipe._key == ${args.input.id}
            LIMIT 1
            RETURN authored_recipe
        )
        UPDATE recipe._key WITH {
          updatedAt: DATE_NOW(),
          title: NOT_NULL(${pathOrNull(
            ['input', 'fields', 'title'],
            args,
          )}, recipe.title),
          introduction: NOT_NULL(${pathOrNull(
            ['input', 'fields', 'introduction'],
            args,
          )}, recipe.introduction),
          description: NOT_NULL(${pathOrNull(
            ['input', 'fields', 'description'],
            args,
          )}, recipe.description),
          servings: NOT_NULL(${pathOrNull(
            ['input', 'fields', 'servings'],
            args,
          )}, recipe.servings),
          cookTime: NOT_NULL(${pathOrNull(
            ['input', 'fields', 'cookTime'],
            args,
          )}, recipe.cookTime),
          prepTime: NOT_NULL(${pathOrNull(
            ['input', 'fields', 'prepTime'],
            args,
          )}, recipe.prepTime),
          unattendedTime: NOT_NULL(${pathOrNull(
            ['input', 'fields', 'unattendedTime'],
            args,
          )}, recipe.unattendedTime),
          private: NOT_NULL(${pathOrNull(
            ['input', 'fields', 'private'],
            args,
          )}, recipe.private),
          published: NOT_NULL(${pathOrNull(
            ['input', 'fields', 'published'],
            args,
          )}, recipe.published),
          steps: NOT_NULL(${pathOrNull(
            ['input', 'steps', 'set'],
            args,
          )}, recipe.steps),
          coverImageUrl: NOT_NULL(${coverImageUrl}, recipe.coverImageUrl)
        } IN Recipes

        RETURN {
          recipe: NEW
        }
        `,
      });
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

  LinkRecipeResult: {
    recipe: arango,
  },
  CreateRecipeResult: {
    recipe: arango,
  },
  UpdateRecipeResult: {
    recipe: arango,
  },
};
