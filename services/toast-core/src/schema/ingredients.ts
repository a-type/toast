import { gql } from 'apollo-server-core';

export default gql`
  type Ingredient {
    id: ID! @aqlKey
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

    food: Food @aqlNode(edgeCollection: "UsedIn", direction: INBOUND)
    recipe: Recipe!
      @aqlNode(edgeCollection: "IngredientOf", direction: OUTBOUND)
  }

  extend type Mutation {
    createIngredient(input: CreateIngredientInput!): CreateIngredientResult!
      @authenticated
    updateIngredient(input: UpdateIngredientInput!): UpdateIngredientResult!
      @authenticated
    deleteIngredient(input: DeleteIngredientInput!): DeleteIngredientResult!
      @authenticated
  }

  input CreateIngredientInput {
    recipeId: ID!
    text: String!
  }

  type CreateIngredientResult {
    ingredientEdge: RecipeIngredientEdge!
      @aqlNewQuery
      @aqlSubquery(query: "LET $field = $parent.ingredientEdge")
    recipe: Recipe!
      @aqlNewQuery
      @aqlSubquery(query: "LET $field = $parent.recipe")
  }

  input UpdateIngredientInput {
    id: ID!
    text: String
    fields: UpdateIngredientFieldsInput
    foodId: ID
  }

  input UpdateIngredientFieldsInput {
    text: String
    foodStart: Int
    foodEnd: Int
    unit: String
    unitStart: Int
    unitEnd: Int
    quantity: Float
    quantityStart: Int
    quantityEnd: Int
    comments: [String!]!
    preparations: [String!]!
  }

  type UpdateIngredientResult {
    ingredient: Ingredient!
      @aqlNewQuery
      @aqlSubquery(query: "LET $field = $parent.ingredient")
  }

  input DeleteIngredientInput {
    id: ID!
  }

  type DeleteIngredientResult {
    ingredient: Ingredient!
      @aqlNewQuery
      @aqlSubquery(query: "LET $field = $parent.ingredient")
    recipe: Recipe!
      @aqlNewQuery
      @aqlSubquery(query: "LET $field = $parent.recipe")
  }
`;
