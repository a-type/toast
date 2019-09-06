import { gql } from 'apollo-server-core';

export default gql`
  type Food {
    id: ID! @aqlKey
    name: String!
    description: String
    attribution: String
    alternateNames: [String!]!
    category: String @defaultValue(value: "miscellaneous")
  }

  extend type Query {
    foods(first: Int = 50, after: String): FoodsConnection!
      @aqlRelayConnection(source: "FOR $node IN Foods")
  }

  type FoodsConnection {
    edges: [FoodEdge!]! @aqlRelayEdges
    pageInfo: FoodsPageInfo! @aqlRelayPageInfo
  }

  type FoodEdge {
    cursor: String!
    node: Food! @aqlRelayNode
  }

  type FoodsPageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  extend type Mutation {
    updateFood(input: FoodUpdateInput): UpdateFoodPayload!
      @aqlSubquery(
        query: """
        LET existing = DOCUMENT(Foods, $args.input.id)
        LET updated = MERGE(
          existing,
          {
            name: LOWER(NOT_NULL($args.input.name, existing.name)),
            description: NOT_NULL($args.input.description, existing.description),
            attribution: NOT_NULL($args.input.attribution, existing.attribution),
            alternateNames: UNION_DISTINCT(MINUS(existing.alternateNames, $args.input.removeAlternateNames), $args.input.addAlternateNames),
            searchHelpers: UNION_DISTINCT(existing.searchHelpers, $args.input.addSearchHelpers),
            category: LOWER(NOT_NULL($args.input.category, existing.category))
          }
        )
        UPDATE updated IN Foods
        LET $field = {
          food: NEW
        }
        """
      )
      @hasClaim(claim: "admin")
  }

  input FoodUpdateInput {
    id: ID!
    name: String
    description: String
    attribution: String
    addAlternateNames: [String!]
    removeAlternateNames: [String!]
    addSearchHelpers: [String!]
    category: String
  }

  type UpdateFoodPayload {
    food: Food! @aqlNewQuery @aqlSubquery(query: "LET $field = $parent.food")
  }
`;
