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
`;
