import { searchIngredients, searchRecipes } from './service';
import { gql } from 'apollo-server-express';
import { neo4jgraphql } from 'neo4j-graphql-js';
import { pathOr } from 'ramda';

export const typeDefs = gql`
  input RecipeSearchInput {
    term: String
    ingredients: IngredientFilterInput
  }

  input IngredientFilterInput {
    include: [ID!]
    exclude: [ID!]
  }

  input IngredientSearchInput {
    term: String
  }

  extend type Query {
    searchRecipes(input: RecipeSearchInput!): [Recipe!]!
      @cypher(
        statement: """
        CALL db.index.fulltext.queryNodes('recipes', $match + '~') YIELD node, score
        WITH node as recipe, score
        WHERE none(x in $exclude WHERE exists((recipe)<-[:INGREDIENT_OF]-()<-[:USED_IN]-(:Ingredient {id:x})))
        AND all(c in $include WHERE exists((recipe)<-[:INGREDIENT_OF]-()<-[:USED_IN]-(:Ingredient{id:c})))
        AND recipe.published = true
        RETURN recipe ORDER BY score DESC
        """
      )
    searchIngredients(input: IngredientSearchInput!): [Ingredient!]!
      @cypher(
        statement: """
        CALL db.index.fulltext.queryNodes('ingredients', $match + '~') YIELD node, score
        RETURN node {.id, .name, .alternateNames}, score ORDER BY score DESC
        """
      )
  }
`;

export const resolvers = {
  Query: {
    searchIngredients: async (_parent, args, ctx, info) =>
      args.input.term
        ? neo4jgraphql(_parent, { match: args.input.term }, ctx, info)
        : [],
    searchRecipes: async (_parent, args, ctx, info) =>
      neo4jgraphql(
        _parent,
        {
          match: args.input.term,
          include: pathOr([], ['input', 'ingredients', 'include'], args),
          exclude: pathOr([], ['input', 'ingredients', 'exclude'], args),
        },
        ctx,
        info,
      ),
  },
};
