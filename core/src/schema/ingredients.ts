import { gql } from 'apollo-server-core';

export default gql`
  type Ingredient {
    id: ID!
    text: String! @defaultValue(value: "")
    foodStart: Int
    foodEnd: Int
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float! @defaultValue(value: 1)
    quantityStart: Int
    quantityEnd: Int
    comments: [String!]! @defaultValue(value: [])
    preparations: [String!]! @defaultValue(value: [])

    food: Food @cypherNode(relationship: "USED_IN", direction: IN)
    recipe: Recipe! @cypherNode(relationship: "INGREDIENT_OF", direction: OUT)
  }

  type IngredientCreateResult {
    recipeIngredient: Ingredient!
      @cypher(
        match: "(recipeIngredient:Ingredient{id:$parent.recipeIngredientId})"
        return: "recipeIngredient"
      )
  }

  type IngredientUpdateResult {
    recipeIngredient: Ingredient
      @cypher(
        match: "(recipeIngredient:Ingredient{id:$parent.recipeIngredientId})"
        return: "recipeIngredient"
      )
  }

  type RecipeFoodDeleteResult {
    foo: Boolean
    # empty type... perhaps one day we will return something.
  }

  enum IngredientCorrectionStatus {
    Submitted
    Accepted
    Rejected
  }

  enum IngredientCorrectionType {
    Change
    Delete
    Add
  }

  # this type is backed by Firestore, not Neo4j
  type IngredientCorrection {
    id: ID!
    status: IngredientCorrectionStatus!
    correctionType: IngredientCorrectionType!
    correctedFields: IngredientCorrectedFields
    correctedText: String

    recipe: Recipe!
      @cypher(match: "(recipe:Recipe{id: parent.recipeId})", return: "recipe")
    ingredient: Ingredient
      @cypher(
        match: "(ingredient:Ingredient{id: parent.ingredientId})"
        return: "ingredient"
      )
  }

  type IngredientCorrectedFields {
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float
    quantityStart: Int
    quantityEnd: Int
    foodStart: Int
    foodEnd: Int
    food: Food @cypher(match: "(food:Food{id: parent.foodId})", return: "food")
  }

  extend type Query {
    ingredientCorrections: [IngredientCorrection!]! @hasClaim(claim: "admin")
  }

  input IngredientCorrectionSubmitInput {
    ingredientId: ID
    recipeId: String!
    correctionType: IngredientCorrectionType!
    correctedText: String
    correctedFields: IngredientCorrectedFieldsInput
  }

  input IngredientCorrectedFieldsInput {
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float
    quantityStart: Int
    quantityEnd: Int
    foodId: String
    foodStart: Int
    foodEnd: Int
  }

  input IngredientCorrectionsFilterInput {
    status: IngredientCorrectionStatus
  }

  input IngredientCorrectionAcceptInput {
    id: ID!
  }

  input IngredientCorrectionRejectInput {
    id: ID!
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
