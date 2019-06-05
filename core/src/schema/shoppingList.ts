import { gql } from 'apollo-server-core';

export default gql`
  type ShoppingListItem {
    id: ID!
    totalQuantity: Float!
    purchasedQuantity: Float!
    unit: String
    foodId: String
    displayName: String!

    plannedUses: [ShoppingListItemUsage!]!

    food: Food @cypher(match: "(food:Food{id: parent.foodId})", return: "food")
  }

  """
  Provides a snapshot of the usage of an ingredient from the shopping
  list in the week's planned recipes. Expand edges to fetch more data.
  """
  type ShoppingListItemUsage {
    ingredientText: String
    recipeTitle: String
    recipeId: String

    ingredient: Ingredient
      @cypher(match: "(ri:Ingredient{id: parent.ingredientId})", return: "ri")
    recipe: Recipe
      @cypher(match: "(recipe:Recipe{id: parent.recipeId})", return: "recipe")
  }

  type ShoppingList {
    id: ID!
    startDate: Date!
    endDate: Date!
    items: [ShoppingListItem!]!
  }

  input ShoppingListMarkItemInput {
    shoppingListItemId: ID!
  }

  input ShoppingListUnmarkItemInput {
    shoppingListItemId: ID!
  }

  extend type Mutation {
    markShoppingListItem(input: ShoppingListMarkItemInput!): ShoppingListItem!
    unmarkShoppingListItem(
      input: ShoppingListUnmarkItemInput!
    ): ShoppingListItem!
  }
`;