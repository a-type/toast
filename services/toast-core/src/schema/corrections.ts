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
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
      @cypher(match: "(ing:Ingredient{id: parent.ingredientId})", return: "ing")
    food: Food! @cypher(match: "(food:Food{id: parent.foodId})", return: "food")
  }

  type ChangeQuantityIngredientCorrection implements IngredientCorrection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
      @cypher(match: "(ing:Ingredient{id: parent.ingredientId})", return: "ing")
    quantity: Float!
  }

  type ChangeUnitIngredientCorrection implements IngredientCorrection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
      @cypher(match: "(ing:Ingredient{id: parent.ingredientId})", return: "ing")
    unit: String!
  }

  type AddIngredientCorrection implements IngredientCorrection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    text: String!
    recipe: Recipe!
      @cypher(match: "(recipe:Recipe{id: parent.recipeId})", return: "recipe")
  }

  type RemoveIngredientCorrection implements IngredientCorrection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    submittedAt: Date!
    ingredient: Ingredient!
      @cypher(match: "(ing:Ingredient{id: parent.ingredientId})", return: "ing")
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
