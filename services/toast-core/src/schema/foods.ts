import { gql } from 'apollo-server-core';

export default gql`
  type Food {
    id: ID! @aqlKey
    name: String!
    description: String
    attribution: String
    alternateNames: [String!]!
  }

  type FoodDeleteResult {
    # empty type...
    foo: Boolean
  }

  input FoodCreateInput {
    name: String!
    description: String
    attribution: String
    alternateNames: [String!] = []
  }

  input FoodUpdateInput {
    id: ID!
    fields: FoodUpdateFieldsInput!
  }

  input FoodUpdateFieldsInput {
    name: String
    description: String
    attribution: String
    alternateNames: [String!]
  }

  input FoodMergeInput {
    primaryId: ID!
    secondaryId: ID!
  }

  input FoodDeleteInput {
    id: ID!
  }
`;
