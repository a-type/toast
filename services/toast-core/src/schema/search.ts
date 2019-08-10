// TODO... this feature cut for focus!

// import { gql } from 'apollo-server-core';

// export default gql`
//   type SearchRecipesConnection {
//     edges: [SearchRecipesEdge!]! @aqlRelayEdge
//     pageInfo: SearchRecipesPageInfo! @aqlRelayPageInfo
//   }

//   type SearchRecipesEdge {
//     cursor: String!
//     node: Recipe! @aqlRelayNode
//   }

//   type SearchRecipesPageInfo {
//     hasNextPage: Boolean!
//   }

//   type SearchFoodsConnection {
//     edges: [SearchIngredientsEdge!]! @aqlRelayEdge
//     pageInfo: SearchIngredientsPageInfo! @aqlRelayPageInfo
//   }

//   type SearchFoodsEdge {
//     cursor: String!
//     node: Food! @aqlRelayNode
//   }

//   input RecipeSearchPaginationInput {
//     first: Int
//     offset: Int
//   }

//   input RecipeSearchInput {
//     term: String
//     foods: RecipeSearchFoodFilterInput = { include: [], exclude: [] }
//     pagination: RecipeSearchPaginationInput = { first: 10, offset: 0 }
//   }

//   input RecipeSearchFoodFilterInput {
//     include: [ID!] = []
//     exclude: [ID!] = []
//   }

//   input FoodSearchPaginationInput {
//     first: Int
//     offset: Int
//   }

//   input FoodSearchInput {
//     term: String
//     pagination: FoodSearchPaginationInput = { first: 10, offset: 0 }
//   }

//   extend type Query {
//     searchRecipes(first: Int = 10, after: String, searchTerm: String!): [Recipe!]!
//       @aqlRelayConnection(
//         documentCollection: "Recipes"
//         cursorProperty: "createdAt"
//         mode: FullText
//         fullTextTerm: "$args.searchTerm"
//         fullTextProperty: "
//       )

//     searchFoods(input: FoodSearchInput!): [Food!]!
//       @cypherCustom(
//         statement: """
//         CALL db.index.fulltext.queryNodes('foods', $args.input.term + '~') YIELD node as food, score
//         RETURN food
//         ORDER BY score
//         DESC
//         SKIP $args.input.pagination.offset
//         LIMIT $args.input.pagination.first
//         """
//       )
//       @defaultValue(value: [])
//   }
// `;
