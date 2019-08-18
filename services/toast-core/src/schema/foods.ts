import { gql } from 'apollo-server-core';

export default gql`
  type Food {
    id: ID! @aqlKey
    name: String!
    description: String
    attribution: String
    alternateNames: [String!]!
    category: String
  }

  extend type Mutation {
    updateFood(input: UpdateFoodInput): UpdateFoodPayload!
      @aqlSubquery(
        query: """
        LET existing = DOCUMENT(Foods, $args.input.id)
        LET updated = MERGE(
          existing,
          {
            name: NON_NULL($args.input.name, existing.name),
            description: NON_NULL($args.input.description, existing.description),
            attribution: NON_NULL($args.input.attribution, existing.attribution),
            alternateNames: UNION_DISTINCT(MINUS(existing.alternateNames, $args.input.removeAlternateNames), $args.input.addAlternateNames),
            searchHelpers: UNION_DISTINCT(existing.searchHelpers, $args.input.addSearchHelpers),
            category: NON_NULL($args.input.category, existing.category)
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

  input UpdateFoodInput {
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
