import { gql } from 'apollo-server-core';

export default gql`
  enum IngredientCorrectionType {
    ChangeFood
    ChangeQuantity
    ChangeUnit
    Add
    Remove
  }

  enum IngredientCorrectionStatus {
    Submitted
    Accepted
    Rejected
  }

  interface IngredientCorrection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
  }

  type ChangeFoodIngredientCorrection implements IngredientConnection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
    foodId: String!
  }

  type ChangeQuantityIngredientCorrection implements IngredientConnection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
    quantity: Float!
  }

  type ChangeUnitIngredientCorrection implements IngredientConnection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
    unit: String!
  }

  type AddIngredientCorrection implements IngredientCorrection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    text: String!
  }

  type RemoveIngredientCorrection implements IngredientCorrection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
  }

  type IngredientCorrectionsConnection {
    edges: [IngredientConnectionEdge!]!
    pageInfo: PageInfo!
  }

  type IngredientCorrectionEdge {
    cursor: String!
    node: IngredientCorrection!
  }

  input IngredientCorrectionsCollectionFilterInput {
    first: Int
    after: string
    status: IngredientCorrectionStatus
  }

  extend type Query {
    ingredientCorrectionsConnection(
      input: IngredientCorrectionsCollectionFilterInput
    ): IngredientCorrectionsConnection!
  }

  input IngredientCorrectionChangeFoodInput {
    foodId: String!
  }

  input IngredientCorrectionChangeQuantityInput {
    quantity: Float!
  }

  input IngredientCorrectionChangeUnitInput {
    unit: String!
  }

  input IngredientCorrectionAddInput {
    text: String!
    recipeId: String!
  }

  input IngredientCorrectionRemoveInput {
    ingredientId: String!
    report: Boolean
  }

  input IngredientCorrectionSubmitInput {
    changeFood: IngredientCorrectionChangeFoodInput
    changeQuantity: IngredientCorrectionChangeQuantityInput
    changeUnit: IngredientCorrectionChangeUnitInput
    add: IngredientCorrectionAddInput
    remove: IngredientCorrectionRemoveInput
  }

  input IngredientCorrectionAcceptInput {
    ingredientCorrectionId: ID!
  }

  input IngredientCorrectionRejectInput {
    ingredientCorrectionId: ID!
  }

  extend type Mutation {
    submitIngredientCorrection(
      input: IngredientCorrectionSubmitInput!
    ): IngredientCorrection! @authenticated

    acceptIngredientCorrection(
      input: IngredientCorrectionAcceptInput!
    ): IngredientCorrection! @hasClaim(claim: "admin")

    rejectIngredientCorrection(
      input: IngredientCorrectionRejectInput!
    ): IngredientCorrection! @hasClaim(claim: "admin")
  }
`;
