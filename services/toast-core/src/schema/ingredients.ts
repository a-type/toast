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

    food: Food @aqlNode(edge: "UsedIn", direction: INBOUND)
    recipe: Recipe! @aqlNode(edge: "IngredientOf", direction: OUTBOUND)
  }
`;
