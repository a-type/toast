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

  type ChangeFoodIngredientCorrection implements IngredientCorrection {
    id: ID! @key
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
      @node(edgeCollection: "Corrects", direction: OUTBOUND)
    food: Food! @node(edgeCollection: "AssignsFood", direction: OUTBOUND)
  }

  type ChangeQuantityIngredientCorrection implements IngredientCorrection {
    id: ID! @key
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
      @node(edgeCollection: "Corrects", direction: OUTBOUND)
    quantity: Float!
  }

  type ChangeUnitIngredientCorrection implements IngredientCorrection {
    id: ID! @key
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
      @node(edgeCollection: "Corrects", direction: OUTBOUND)
    unit: String!
  }

  type AddIngredientCorrection implements IngredientCorrection {
    id: ID! @key
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    text: String!
    recipe: Recipe! @node(edgeCollection: "ForRecipe", direction: OUTBOUND)
  }

  type RemoveIngredientCorrection implements IngredientCorrection {
    id: ID! @key
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
      @node(edgeCollection: "Corrects", direction: OUTBOUND)
  }

  type IngredientCorrectionsConnection {
    edges: [IngredientCorrectionEdge!]!
    pageInfo: PageInfo!
  }

  type IngredientCorrectionEdge {
    cursor: String!
    node: IngredientCorrection!
  }

  input IngredientCorrectionsCollectionFilterInput {
    first: Int
    after: String
    status: IngredientCorrectionStatus
  }

  extend type Query {
    ingredientCorrectionsConnection(
      input: IngredientCorrectionsCollectionFilterInput
    ): IngredientCorrectionsConnection!
      @aqlRelayConnection(
        documentCollection: "IngredientCorrections"
        cursorProperty: "submittedAt"
      )
  }

  input IngredientCorrectionChangeFoodInput {
    ingredientId: String!
    foodId: String!
  }

  input IngredientCorrectionChangeQuantityInput {
    ingredientId: String!
    quantity: Float!
  }

  input IngredientCorrectionChangeUnitInput {
    ingredientId: String!
    unit: String!
  }

  input IngredientCorrectionAddInput {
    text: String!
  }

  input IngredientCorrectionRemoveInput {
    ingredientId: String!
  }

  input IngredientCorrectionSubmitInput {
    recipeId: String!

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
