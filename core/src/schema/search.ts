import { gql } from 'apollo-server-core';

export default gql`
  # type RecipeSearchConnection @cypherVirtual {
  #   # this is nodes because I can't figure out how to make the Cypher work...
  #   nodes: [Recipe!]!
  #     # TODO: normalize search term... replace /[^a-zA-Z0-9 -]/ with ''
  #     @cypherCustom(
  #       statement: """
  #       CALL db.index.fulltext.queryNodes('recipes', $virtual.input.match + '~') YIELD node AS recipe, score
  #       WHERE none(
  #         x in $virtual.input.foods.exclude WHERE
  #           exists((recipe)<-[:INGREDIENT_OF]-()<-[:USED_IN]-(:Food{id:x}))
  #       )
  #       AND all(
  #         c in $virtual.input.foods.include WHERE
  #           exists((recipe)<-[:INGREDIENT_OF]-()<-[:USED_IN]-(:Food{id:c}))
  #       )
  #       AND coalesce(recipe.published, false) = true
  #       AND coalesce(recipe.private, false) = false
  #       RETURN recipe
  #       ORDER BY score
  #       DESC
  #       SKIP $virtual.input.pagination.offset
  #       LIMIT $virtual.input.pagination.first
  #       """
  #     )
  # }

  # type FoodSearchConnection @cypherVirtual {
  #   nodes: [Food!]!
  #     # TODO: normalize search term... replace /[^a-zA-Z0-9 -]/ with ''
  #     @cypherCustom(
  #       statement: """
  #       CALL db.index.fulltext.queryNodes('foods', $virtual.input.match + '~') YIELD node as food, score
  #       RETURN food
  #       ORDER BY score
  #       SKIP $virtual.input.pagination.offset
  #       LIMIT $virtual.input.pagination.first
  #       """
  #     )
  # }

  input RecipeSearchPaginationInput {
    first: Int
    offset: Int
  }

  input RecipeSearchInput {
    term: String
    foods: RecipeSearchFoodFilterInput = { include: [], exclude: [] }
    pagination: RecipeSearchPaginationInput = { first: 10, offset: 0 }
  }

  input RecipeSearchFoodFilterInput {
    include: [ID!] = []
    exclude: [ID!] = []
  }

  input FoodSearchPaginationInput {
    first: Int
    offset: Int
  }

  input FoodSearchInput {
    term: String
    pagination: FoodSearchPaginationInput = { first: 10, offset: 0 }
  }

  extend type Query {
    searchRecipes(input: RecipeSearchInput!): [Recipe!]!
      @cypherCustom(
        statement: """
        CALL db.index.fulltext.queryNodes('recipes', $args.input.term + '~') YIELD node AS recipe, score
        WHERE none(
          x in coalesce($args.input.foods.exclude, []) WHERE
            exists((recipe)<-[:INGREDIENT_OF]-()<-[:USED_IN]-(:Food{id:x}))
        )
        AND all(
          c in coalesce($args.input.foods.include, []) WHERE
            exists((recipe)<-[:INGREDIENT_OF]-()<-[:USED_IN]-(:Food{id:c}))
        )
        AND coalesce(recipe.published, false) = true
        AND coalesce(recipe.private, false) = false
        RETURN recipe
        ORDER BY score
        DESC
        SKIP $args.input.pagination.offset
        LIMIT $args.input.pagination.first
        """
      )
    searchFoods(input: FoodSearchInput!): [Food!]!
      @cypherCustom(
        statement: """
        CALL db.index.fulltext.queryNodes('foods', $args.input.term + '~') YIELD node as food, score
        RETURN food
        ORDER BY score
        SKIP $args.input.pagination.offset
        LIMIT $args.input.pagination.first
        """
      )
  }
`;
